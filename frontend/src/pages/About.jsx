import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaUser, FaCode, FaLaptop, FaCoffee, FaHeart } from 'react-icons/fa';
import BackgroundAnimation from '../components/BackgroundAnimation';
import './About.css';

const About = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 50 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 50 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const floatingIcons = [
        { Icon: FaUser, delay: 0, position: { top: '15%', left: '10%' } },
        { Icon: FaCode, delay: 0.2, position: { top: '25%', right: '15%' } },
        { Icon: FaLaptop, delay: 0.4, position: { bottom: '20%', left: '12%' } },
        { Icon: FaCoffee, delay: 0.6, position: { top: '60%', right: '10%' } },
        { Icon: FaHeart, delay: 0.8, position: { bottom: '30%', right: '20%' } },
    ];

    return (
        <div className="about">
            <BackgroundAnimation icons={floatingIcons} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.h1
                    className="section-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    About Me
                </motion.h1>

                <div className="about-content">
                    <motion.div
                        className="profile-section perspective-container"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <motion.div
                            className="profile-image preserve-3d"
                            style={{ rotateX, rotateY }}
                        >
                            <img src="/gagana.jpg" alt="Gagana B M" style={{ transform: "translateZ(50px)" }} />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="bio-section glass-card"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <p className="bio">
                            Hello! I'm Gagana B M, a passionate MERN stack developer with a strong foundation in Data Structures and Algorithms.
                            I love building modern, responsive web applications and solving complex problems.
                            Currently exploring new technologies and working on exciting projects.
                        </p>

                        <div className="social-links">
                            <a href="https://github.com/Gaganabm30" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaGithub /> GitHub
                            </a>
                            <a href="https://linkedin.com/in/gaganabm" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaLinkedin /> LinkedIn
                            </a>
                            <a href="https://www.instagram.com/__.g_a_g_a_n_a.__" target="_blank" rel="noopener noreferrer" className="social-link">
                                <FaInstagram /> Instagram
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
