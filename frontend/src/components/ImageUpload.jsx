import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = ({ onUpload, initialImage }) => {
    const [image, setImage] = useState(initialImage || '');
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const uploadFileHandler = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await axios.post('https://gbackend-xeaj.onrender.com/api/upload', formData, config);
            setImage(data);
            onUpload(data);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            uploadFileHandler(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            uploadFileHandler(e.target.files[0]);
        }
    };

    return (
        <div
            className={`image-upload-container ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            style={{
                border: '2px dashed var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                padding: '2rem',
                textAlign: 'center',
                background: dragActive ? 'rgba(0, 240, 255, 0.1)' : 'var(--glass-bg)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative'
            }}
        >
            <input
                type="file"
                onChange={handleChange}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                }}
            />

            {uploading ? (
                <div className="text-gradient">Uploading...</div>
            ) : image ? (
                <div style={{ position: 'relative' }}>
                    <img
                        src={`https://gbackend-xeaj.onrender.com${image}`}
                        alt="Uploaded"
                        style={{
                            maxHeight: '200px',
                            margin: '0 auto',
                            borderRadius: 'var(--radius-sm)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                        }}
                    />
                    <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Click or drag to replace</p>
                </div>
            ) : (
                <div>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📁</div>
                    <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>Click or Drag & Drop to Upload Image</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supports JPG, PNG</p>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
