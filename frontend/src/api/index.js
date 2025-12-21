import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000/api' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export const login = (formData) => API.post('/auth/login', formData);

// Skills
export const getSkills = () => API.get('/skills');
export const addSkill = (skill) => API.post('/skills', skill);
export const updateSkill = (id, skill) => API.put(`/skills/${id}`, skill);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

// Achievements
export const getAchievements = () => API.get('/achievements');
export const addAchievement = (achievement) => API.post('/achievements', achievement);
export const updateAchievement = (id, achievement) => API.put(`/achievements/${id}`, achievement);
export const deleteAchievement = (id) => API.delete(`/achievements/${id}`);

// Projects
export const getProjects = () => API.get('/projects');
export const addProject = (project) => API.post('/projects', project);
export const updateProject = (id, project) => API.put(`/projects/${id}`, project);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Education
export const getEducation = () => API.get('/education');
export const addEducation = (edu) => API.post('/education', edu);
export const updateEducation = (id, edu) => API.put(`/education/${id}`, edu);
export const deleteEducation = (id) => API.delete(`/education/${id}`);

// Messages
export const postContactMessage = (message) => API.post('/messages', message);
export const getContactMessages = () => API.get('/messages');
export const deleteContactMessage = (id) => API.delete(`/messages/${id}`);
