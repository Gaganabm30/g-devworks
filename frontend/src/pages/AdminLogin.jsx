import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUserShield, FaKey, FaCog, FaDatabase, FaServer } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import BackgroundAnimation from '../components/BackgroundAnimation';
import './AdminLogin.css';

const AdminLogin = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(formData.username, formData.password);
        if (result.success) {
            navigate('/admin/dashboard');
        } else {
            // Display the specific error message from the backend or network
            setError(result.message || 'Login failed. Please check console for details.');
            console.error('Login failed result:', result);
        }
    };

    const floatingIcons = [
        { Icon: FaLock, delay: 0, position: { top: '15%', left: '10%' } },
        { Icon: FaUserShield, delay: 0.2, position: { top: '25%', right: '15%' } },
        { Icon: FaKey, delay: 0.4, position: { bottom: '20%', left: '12%' } },
        { Icon: FaCog, delay: 0.6, position: { top: '60%', right: '10%' } },
        { Icon: FaDatabase, delay: 0.8, position: { bottom: '30%', right: '20%' } },
        { Icon: FaServer, delay: 1, position: { top: '40%', left: '8%' } },
    ];

    return (
        <div className="admin-login">
            <BackgroundAnimation icons={floatingIcons} />
            <div className="login-card card" style={{ position: 'relative', zIndex: 1 }}>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="btn">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
