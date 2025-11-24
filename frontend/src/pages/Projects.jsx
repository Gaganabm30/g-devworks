import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaProjectDiagram, FaFolderOpen, FaCodeBranch, FaLaptopCode, FaServer } from 'react-icons/fa';
import api from '../api/axios';
import BackgroundAnimation from '../components/BackgroundAnimation';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects');
            setProjects(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setLoading(false);
        }
    };

    const floatingIcons = [
        { Icon: FaProjectDiagram, delay: 0, position: { top: '15%', left: '10%' } },
        { Icon: FaGithub, delay: 0.2, position: { top: '25%', right: '15%' } },
        { Icon: FaFolderOpen, delay: 0.4, position: { bottom: '20%', left: '12%' } },
        { Icon: FaCodeBranch, delay: 0.6, position: { top: '60%', right: '10%' } },
        { Icon: FaLaptopCode, delay: 0.8, position: { bottom: '30%', right: '20%' } },
        { Icon: FaServer, delay: 1, position: { top: '40%', left: '8%' } },
    ];

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="projects">
            <BackgroundAnimation icons={floatingIcons} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.h1
                    className="section-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Projects
                </motion.h1>

                <div className="projects-grid">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project._id}
                            className="project-card card perspective-container"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05, rotateY: 5, z: 50 }}
                            transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            <div className="project-image" style={{ transform: "translateZ(20px)" }}>
                                <img src={project.image.startsWith('http') ? project.image : `http://localhost:5000${project.image}`} alt={project.title} />
                            </div>
                            <div className="project-content" style={{ transform: "translateZ(30px)" }}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tags">
                                    {project.tags?.map((tag) => (
                                        <span key={tag} className="tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    {project.githubLink && (
                                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                                            <FaGithub /> GitHub
                                        </a>
                                    )}
                                    {project.demoLink && (
                                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                                            <FaExternalLinkAlt /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
