import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import './Resume.css';

const Resume = () => {
    return (
        <div className="resume">
            <div className="container">
                <motion.h1
                    className="section-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Resume
                </motion.h1>

                <motion.div
                    className="resume-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="resume-preview glass-card">
                        <iframe
                            src="/resume.pdf"
                            title="Resume"
                            className="resume-iframe"
                        />
                    </div>
                    <a
                        href="/resume.pdf"
                        download="Gagana_BM_Resume.pdf"
                        className="btn download-btn"
                    >
                        <FaDownload />
                        <span>Download Resume</span>
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default Resume;
