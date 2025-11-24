import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCommentDots, FaUserEdit } from 'react-icons/fa';
import api from '../api/axios';
import BackgroundAnimation from '../components/BackgroundAnimation';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/contact', formData);
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            setStatus('Failed to send message. Please try again.');
            setTimeout(() => setStatus(''), 3000);
        }
    };

    const floatingIcons = [
        { Icon: FaEnvelope, delay: 0, position: { top: '15%', left: '10%' } },
        { Icon: FaPhone, delay: 0.2, position: { top: '25%', right: '15%' } },
        { Icon: FaMapMarkerAlt, delay: 0.4, position: { bottom: '20%', left: '12%' } },
        { Icon: FaPaperPlane, delay: 0.6, position: { top: '60%', right: '10%' } },
        { Icon: FaCommentDots, delay: 0.8, position: { bottom: '30%', right: '20%' } },
        { Icon: FaUserEdit, delay: 1, position: { top: '40%', left: '8%' } },
    ];

    return (
        <div className="contact">
            <BackgroundAnimation icons={floatingIcons} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.h1
                    className="section-title"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Contact Me
                </motion.h1>

                <motion.div
                    className="contact-form-wrapper"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <form onSubmit={handleSubmit} className="contact-form card">
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn">Send Message</button>
                        {status && <p className="status-message">{status}</p>}
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
