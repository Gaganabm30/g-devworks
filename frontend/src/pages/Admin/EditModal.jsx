import React from 'react';
import styled from 'styled-components';
import { Button, Modal, TextField, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.card};
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 0 20px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ImagePreview = styled.img`
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-top: 10px;
`;

const EditModal = ({ open, handleClose, data, handleChange, handleSubmit, type }) => {
    const [currentSkill, setCurrentSkill] = React.useState({ name: '', image: '' });

    const handleAddSkill = () => {
        if (currentSkill.name && currentSkill.image) {
            const updatedSkills = [...(data.skills || []), currentSkill];
            // Create a synthetic event to update the parent state
            handleChange({ target: { value: updatedSkills } }, 'skills');
            setCurrentSkill({ name: '', image: '' });
        }
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = data.skills.filter((_, i) => i !== index);
        handleChange({ target: { value: updatedSkills } }, 'skills');
    };

    const handleFileChange = (e, key) => {
        const file = e.target.files[0];
        if (file) {
            handleChange({ target: { value: file } }, key);
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <ModalContainer theme={{ card: '#171721' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ color: 'white', margin: 0 }}>{data._id ? 'Edit' : 'Add'} {type}</h2>
                    <IconButton onClick={handleClose} style={{ color: 'white' }}>
                        <Close />
                    </IconButton>
                </div>

                {Object.keys(data).map((key) => {
                    if (key === '_id' || key === '__v') return null;

                    // Arrays (Skills, Tags)
                    if (key === 'skills' || key === 'tags') {
                        // Skip nested objects for now for simple arrays
                        if (type === 'Skill' && key === 'skills') return null;

                        return (
                            <TextField
                                key={key}
                                label={key.toUpperCase() + " (Comma separated)"}
                                variant="outlined"
                                value={Array.isArray(data[key]) ? data[key].join(', ') : data[key]}
                                onChange={(e) => handleChange(e, key, true)}
                                fullWidth
                                InputLabelProps={{ style: { color: 'gray' } }}
                                InputProps={{ style: { color: 'white' } }}
                            />
                        )
                    }

                    // Image Upload
                    if (key === 'img' || key === 'image') {
                        return (
                            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                                <label style={{ color: 'gray', fontSize: '12px' }}>{key.toUpperCase()} (Upload or URL)</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id={`raised-button-file-${key}`}
                                        type="file"
                                        onChange={(e) => handleFileChange(e, key)}
                                    />
                                    <label htmlFor={`raised-button-file-${key}`}>
                                        <Button variant="contained" component="span" size="small">
                                            Upload Image
                                        </Button>
                                    </label>
                                    <TextField
                                        variant="outlined"
                                        size="small"
                                        placeholder="Or paste Image URL"
                                        value={data[key] || ''}
                                        onChange={(e) => handleChange(e, key)}
                                        fullWidth
                                        InputProps={{ style: { color: 'white' } }}
                                    />
                                </div>
                                {data[key] && <ImagePreview src={typeof data[key] === 'object' ? URL.createObjectURL(data[key]) : data[key]} alt="Preview" />}
                            </div>
                        );
                    }

                    // Text Area for descriptions
                    if (key === 'desc' || key === 'description') {
                        return (
                            <TextField
                                key={key}
                                label={key.toUpperCase()}
                                variant="outlined"
                                value={data[key] || ''}
                                onChange={(e) => handleChange(e, key)}
                                fullWidth
                                multiline
                                rows={4}
                                InputLabelProps={{ style: { color: 'gray' } }}
                                InputProps={{ style: { color: 'white' } }}
                            />
                        );
                    }

                    // Simple Text Input
                    return (
                        <TextField
                            key={key}
                            label={type === 'Skill' && key === 'title' ? "CATEGORY NAME" : key.toUpperCase()}
                            variant="outlined"
                            value={data[key] || ''}
                            onChange={(e) => handleChange(e, key)}
                            fullWidth
                            InputLabelProps={{ style: { color: 'gray' } }}
                            InputProps={{ style: { color: 'white' } }}
                        />
                    );
                })}

                {data.skills !== undefined && type === 'Skill' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                            <TextField
                                label="Skill Name"
                                variant="outlined"
                                value={currentSkill.name}
                                onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                                fullWidth
                                InputLabelProps={{ style: { color: 'gray' } }}
                                InputProps={{ style: { color: 'white' } }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="skill-image-upload"
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setCurrentSkill({ ...currentSkill, image: reader.result });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                    />
                                    <label htmlFor="skill-image-upload">
                                        <Button variant="contained" component="span" size="small" style={{ height: '56px' }}>
                                            Upload
                                        </Button>
                                    </label>
                                    <TextField
                                        label="Image URL"
                                        variant="outlined"
                                        value={currentSkill.image}
                                        onChange={(e) => setCurrentSkill({ ...currentSkill, image: e.target.value })}
                                        fullWidth
                                        InputLabelProps={{ style: { color: 'gray' } }}
                                        InputProps={{ style: { color: 'white' } }}
                                    />
                                </div>
                            </div>
                            <Button variant="contained" onClick={handleAddSkill} disabled={!currentSkill.name || !currentSkill.image} style={{ height: '56px' }}>Add</Button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                            {data.skills.map((skill, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#333', padding: '8px', borderRadius: '5px' }}>
                                    <img src={skill.image} alt={skill.name} style={{ width: '30px', height: '30px', borderRadius: '5px', objectFit: 'cover' }} />
                                    <span style={{ color: 'white', flex: 1 }}>{skill.name}</span>
                                    <IconButton size="small" onClick={() => handleRemoveSkill(index)} style={{ color: 'red' }}>
                                        <Close fontSize="small" />
                                    </IconButton>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <Button variant="contained" color="primary" onClick={handleSubmit} size="large" style={{ marginTop: '10px' }}>
                    Save Item
                </Button>
            </ModalContainer>
        </Modal>
    );
};

export default EditModal;
