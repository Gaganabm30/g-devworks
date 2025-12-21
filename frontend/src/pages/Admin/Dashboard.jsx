import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
    getSkills, addSkill, updateSkill, deleteSkill,
    getAchievements, addAchievement, updateAchievement, deleteAchievement,
    getProjects, addProject, updateProject, deleteProject,
    getEducation, addEducation, updateEducation, deleteEducation,
    getContactMessages, deleteContactMessage
} from '../../api';
import EditModal from './EditModal';
import { Delete, Edit } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const DashboardContainer = styled.div`
  padding: 20px;
  background-color: ${({ theme }) => theme.bg};
  min-height: 100vh;
  color: ${({ theme }) => theme.text_primary};
  position: relative;
  z-index: 1;
`;

const Section = styled.div`
  margin-bottom: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  padding-bottom: 10px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-weight: bold;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.card};
  padding: 20px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
`;

const Dashboard = () => {
    const [skills, setSkills] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [projects, setProjects] = useState([]);
    const [education, setEducation] = useState([]);
    const [messages, setMessages] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentData, setCurrentData] = useState({});
    const [currentType, setCurrentType] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/admin');
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const skillsRes = await getSkills();
            setSkills(skillsRes.data);
            const achRes = await getAchievements();
            setAchievements(achRes.data);
            const projRes = await getProjects();
            setProjects(projRes.data);
            const eduRes = await getEducation();
            setEducation(eduRes.data);
            const msgRes = await getContactMessages();
            setMessages(msgRes.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleOpen = (type, data = {}) => {
        setCurrentType(type);
        setCurrentData(data);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentData({});
    };

    const handleChange = (e, key, isArray = false) => {
        let value = e.target.value;
        if (isArray) {
            value = value.split(',').map(item => item.trim()); // Simple split by comma
        }
        setCurrentData({ ...currentData, [key]: value });
    };

    const handleSubmit = async () => {
        try {
            let dataToSend = currentData;
            // Check if any field is a File object
            const hasFile = Object.values(currentData).some(val => val instanceof File);

            if (hasFile) {
                const formData = new FormData();
                Object.keys(currentData).forEach(key => {
                    // For arrays (like skills, tags), we might need special handling if backend expects array.
                    // Append arrays as multiple entries with same key, or JSON stringify.
                    // Backend for tags expects array. Multer might not handle simple array appending well if not configured.
                    // But typically: formData.append('tags', tag) for each tag.
                    // OR better: JSON.stringify for complex fields if backend parses "tags" from body.
                    // My backend: new Project(projectData). Mongoose handles tags: [String].
                    // If I send formData.append('tags', 'tag1, tag2'), it might be a single string.
                    // Let's stick to simple key-value for now, and handle array specially if needed.
                    // currentData.tags is array in my code (handleChange split it).

                    if (key === 'tags' || key === 'skills') {
                        // Send as JSON string for arrays to ensure structure, Backend needs to JSON.parse(req.body.tags) if it receives string.
                        // BUT my backend does NOT parse JSON manually. It expects req.body to work.
                        // express.urlencoded extended: true parses nested objects somewhat.
                        // Simplest for now: Loop.
                        if (Array.isArray(currentData[key])) {
                            currentData[key].forEach(item => formData.append(key, item));
                        } else {
                            formData.append(key, currentData[key]);
                        }
                    } else {
                        formData.append(key, currentData[key]);
                    }
                });
                dataToSend = formData;
            }

            if (currentType === 'Skill') {
                if (currentData._id) await updateSkill(currentData._id, dataToSend);
                else await addSkill(dataToSend);
            } else if (currentType === 'Achievement') {
                if (currentData._id) await updateAchievement(currentData._id, dataToSend);
                else await addAchievement(dataToSend);
            } else if (currentType === 'Project') {
                if (currentData._id) await updateProject(currentData._id, dataToSend);
                else await addProject(dataToSend);
            } else if (currentType === 'Education') {
                if (currentData._id) await updateEducation(currentData._id, dataToSend);
                else await addEducation(dataToSend);
            }
            fetchData();
            handleClose();
        } catch (error) {
            console.error("Error saving data:", error);
            alert(`Failed to save data: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDelete = async (type, id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                if (type === 'Skill') await deleteSkill(id);
                else if (type === 'Achievement') await deleteAchievement(id);
                else if (type === 'Project') await deleteProject(id);
                else if (type === 'Education') await deleteEducation(id);
                else if (type === 'Message') await deleteContactMessage(id);
                fetchData();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin');
    };

    return (
        <DashboardContainer>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Admin Dashboard</h1>
                <AddButton onClick={handleLogout} style={{ backgroundColor: 'red', marginBottom: 0 }}>Logout</AddButton>
            </div>

            {/* Messages Section */}
            <Section>
                <SectionTitle>Messages</SectionTitle>
                <CardGrid>
                    {messages.map((msg) => (
                        <Card key={msg._id} style={{ borderLeft: '4px solid #854ce6' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <h3>{msg.name}</h3>
                                <small>{new Date(msg.createdAt).toLocaleDateString()}</small>
                            </div>
                            <p style={{ fontWeight: 'bold', color: '#854ce6' }}>{msg.subject}</p>
                            <p style={{ fontStyle: 'italic', marginBottom: '10px' }}>{msg.email}</p>
                            <p>{msg.message}</p>
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <IconButton onClick={() => handleDelete('Message', msg._id)} color="error"><Delete /></IconButton>
                            </div>
                        </Card>
                    ))}
                    {messages.length === 0 && <p>No messages yet.</p>}
                </CardGrid>
            </Section>

            {/* Achievements Section */}
            <Section>
                <SectionTitle>Achievements</SectionTitle>
                <AddButton onClick={() => handleOpen('Achievement', { title: '', description: '', date: '', img: '', tags: [] })}>Add Achievement</AddButton>
                <CardGrid>
                    {achievements.map((ach) => (
                        <Card key={ach._id}>
                            <h3>{ach.title}</h3>
                            <p>{ach.description ? ach.description.substring(0, 50) + "..." : ""}</p>
                            <p>{ach.date}</p>
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <IconButton onClick={() => handleOpen('Achievement', {
                                    title: '', description: '', date: '', img: '', tags: [],
                                    ...ach // Merge existing data over defaults
                                })} color="primary"><Edit /></IconButton>
                                <IconButton onClick={() => handleDelete('Achievement', ach._id)} color="error"><Delete /></IconButton>
                            </div>
                        </Card>
                    ))}
                </CardGrid>
            </Section>

            {/* Projects Section */}
            <Section>
                <SectionTitle>Projects</SectionTitle>
                <AddButton onClick={() => handleOpen('Project', { title: '', date: '', description: '', tags: [], image: '', category: '', github: '', webapp: '' })}>Add Project</AddButton>
                <CardGrid>
                    {projects.map((proj) => (
                        <Card key={proj._id}>
                            <h3>{proj.title}</h3>
                            <p>{proj.date}</p>
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <IconButton onClick={() => handleOpen('Project', proj)} color="primary"><Edit /></IconButton>
                                <IconButton onClick={() => handleDelete('Project', proj._id)} color="error"><Delete /></IconButton>
                            </div>
                        </Card>
                    ))}
                </CardGrid>
            </Section>

            {/* Education Section */}
            <Section>
                <SectionTitle>Education</SectionTitle>
                <AddButton onClick={() => handleOpen('Education', { school: '', degree: '', date: '', grade: '', desc: '', img: '' })}>Add Education</AddButton>
                <CardGrid>
                    {education.map((edu) => (
                        <Card key={edu._id}>
                            <h3>{edu.school}</h3>
                            <p>{edu.degree}</p>
                            <p>{edu.date}</p>
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <IconButton onClick={() => handleOpen('Education', edu)} color="primary"><Edit /></IconButton>
                                <IconButton onClick={() => handleDelete('Education', edu._id)} color="error"><Delete /></IconButton>
                            </div>
                        </Card>
                    ))}
                </CardGrid>
            </Section>

            {/* Skills Section */}
            <Section>
                <SectionTitle>Skills Categories</SectionTitle>
                <AddButton onClick={() => handleOpen('Skill', { title: '', skills: [] })}>Add Skill Category</AddButton>
                <CardGrid>
                    {skills.map((skill) => (
                        <Card key={skill._id}>
                            <h3>{skill.title}</h3>
                            <p>{skill.skills?.length || 0} skills</p>
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <IconButton onClick={() => handleOpen('Skill', skill)} color="primary"><Edit /></IconButton>
                                <IconButton onClick={() => handleDelete('Skill', skill._id)} color="error"><Delete /></IconButton>
                            </div>
                        </Card>
                    ))}
                </CardGrid>
            </Section>

            <EditModal
                open={open}
                handleClose={handleClose}
                data={currentData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                type={currentType}
            />
        </DashboardContainer>
    );
};

export default Dashboard;
