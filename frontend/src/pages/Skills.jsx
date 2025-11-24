import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaTerminal, FaLaptopCode, FaCogs, FaServer } from 'react-icons/fa';
import { SiJavascript, SiPython, SiReact, SiHtml5, SiCss3, SiMongodb } from 'react-icons/si';
import api from '../api/axios';
import BackgroundAnimation from '../components/BackgroundAnimation';
import './Skills.css';

const Skills = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const { data } = await api.get('/skills');
            setSkills(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching skills:', error);
            setLoading(false);
        }
    };

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    const floatingSymbols = [
        { Icon: FaCode, delay: 0, position: { top: '10%', left: '5%' } },
        { Icon: SiJavascript, delay: 1, position: { top: '20%', right: '10%' } },
        { Icon: FaTerminal, delay: 2, position: { bottom: '15%', left: '8%' } },
        { Icon: SiReact, delay: 3, position: { bottom: '25%', right: '5%' } },
        { Icon: FaLaptopCode, delay: 1.5, position: { top: '40%', left: '15%' } },
        { Icon: SiPython, delay: 2.5, position: { top: '60%', right: '15%' } },
        { Icon: FaCogs, delay: 0.5, position: { bottom: '40%', left: '20%' } },
        { Icon: SiHtml5, delay: 3.5, position: { top: '15%', right: '25%' } },
        { Icon: SiCss3, delay: 1.2, position: { bottom: '10%', right: '30%' } },
        { Icon: FaServer, delay: 2.2, position: { top: '30%', left: '30%' } },
        { Icon: SiMongodb, delay: 0.8, position: { bottom: '50%', right: '40%' } },
    ];

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="skills">
            <BackgroundAnimation icons={floatingSymbols} />

            <div className="container">
                <motion.h1
                    className="section-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Skills
                </motion.h1>

                {Object.entries(groupedSkills).map(([category, categorySkills], idx) => (
                    <motion.div
                        key={category}
                        className="skill-category glass-card perspective-container"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        style={{ marginBottom: '2rem' }}
                    >
                        <h2 className="category-title gradient-text">{category}</h2>
                        <div className="skill-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {categorySkills.map((skill) => (
                                <motion.span
                                    key={skill._id}
                                    className="skill-tag"
                                    whileHover={{ scale: 1.1, rotate: 3, z: 20 }}
                                    style={{
                                        display: 'inline-block',
                                        padding: '0.8rem 1.5rem',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '30px',
                                        border: '1px solid var(--glass-border)',
                                        cursor: 'default',
                                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {skill.name}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
