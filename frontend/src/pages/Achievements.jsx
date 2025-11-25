import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaStar, FaMedal, FaCrown, FaAward, FaCertificate } from 'react-icons/fa';
import api from '../api/axios';
import './Achievements.css';

const Achievements = () => {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const { data } = await api.get('/achievements');
            setAchievements(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching achievements:', error);
            setLoading(false);
        }
    };

    const floatingIcons = [
        { Icon: FaTrophy, delay: 0, position: { top: '10%', left: '5%' } },
        { Icon: FaStar, delay: 1, position: { top: '20%', right: '10%' } },
        { Icon: FaMedal, delay: 2, position: { bottom: '15%', left: '8%' } },
        { Icon: FaCrown, delay: 3, position: { bottom: '25%', right: '5%' } },
        { Icon: FaAward, delay: 1.5, position: { top: '40%', left: '15%' } },
        { Icon: FaCertificate, delay: 2.5, position: { top: '60%', right: '15%' } },
        { Icon: FaStar, delay: 0.5, position: { bottom: '40%', left: '20%' } },
        { Icon: FaTrophy, delay: 3.5, position: { top: '15%', right: '25%' } },
    ];

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="achievements">
            {/* Animated Background */}
            <div className="achievements-bg">
                <div className="achievement-orb orb-1"></div>
                <div className="achievement-orb orb-2"></div>
                <div className="achievement-orb orb-3"></div>
            </div>

            {/* Floating Achievement Icons */}
            <div className="floating-achievements">
                {floatingIcons.map(({ Icon, delay, position }, index) => (
                    <motion.div
                        key={index}
                        className="floating-achievement"
                        style={position}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.5, scale: 1 }}
                        transition={{
                            duration: 1,
                            delay: delay,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            repeatDelay: 3
                        }}
                    >
                        <Icon />
                    </motion.div>
                ))}
            </div>

            <div className="container">
                <motion.h1
                    className="section-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Achievements
                </motion.h1>

                <div className="timeline">
                    {achievements.map((achievement, idx) => (
                        <motion.div
                            key={achievement._id}
                            className="timeline-item card perspective-container"
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05, rotateY: idx % 2 === 0 ? 5 : -5, z: 30 }}
                            transition={{ delay: idx * 0.1, type: "spring", stiffness: 300 }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {achievement.image && (
                                <div className="achievement-image" style={{ transform: "translateZ(20px)" }}>
                                    <img src={achievement.image.startsWith('http') ? achievement.image : `https://gbackend-xeaj.onrender.com${achievement.image}`} alt={achievement.title} />
                                </div>
                            )}
                            <div className="achievement-content" style={{ transform: "translateZ(30px)" }}>
                                <h3>{achievement.title}</h3>
                                {achievement.date && <p className="date">{achievement.date}</p>}
                                <p className="description">{achievement.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Achievements;
