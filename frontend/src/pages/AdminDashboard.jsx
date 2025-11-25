import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import api from '../api/axios';
import './AdminDashboard.css';
import ImageUpload from '../components/ImageUpload';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({});
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/admin/login');
        } else {
            fetchItems();
        }
    }, [user, activeTab, navigate]);

    const fetchItems = async () => {
        try {
            const { data } = await api.get(`/${activeTab}`);
            setItems(data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await api.put(`/${activeTab}/${editId}`, formData);
            } else {
                await api.post(`/${activeTab}`, formData);
            }
            setFormData({});
            setEditId(null);
            fetchItems();
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    const handleEdit = (item) => {
        setFormData(item);
        setEditId(item._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/${activeTab}/${id}`);
                fetchItems();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </div>

            <div className="dashboard-tabs">
                <button
                    className={activeTab === 'projects' ? 'active' : ''}
                    onClick={() => setActiveTab('projects')}
                >
                    Projects
                </button>
                <button
                    className={activeTab === 'skills' ? 'active' : ''}
                    onClick={() => setActiveTab('skills')}
                >
                    Skills
                </button>
                <button
                    className={activeTab === 'achievements' ? 'active' : ''}
                    onClick={() => setActiveTab('achievements')}
                >
                    Achievements
                </button>
                <button
                    className={activeTab === 'contact' ? 'active' : ''}
                    onClick={() => setActiveTab('contact')}
                >
                    Messages
                </button>
            </div>

            <div className="dashboard-content">
                {activeTab !== 'contact' && (
                    <div className="form-section card">
                        <h2>{editId ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</h2>
                        <form onSubmit={handleSubmit}>
                            {activeTab === 'projects' && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={formData.title || ''}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                    <ImageUpload
                                        onUpload={(url) => setFormData({ ...formData, image: url })}
                                        initialImage={formData.image}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Tags (comma separated)"
                                        value={formData.tags?.join(', ') || ''}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="GitHub Link"
                                        value={formData.githubLink || ''}
                                        onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Demo Link"
                                        value={formData.demoLink || ''}
                                        onChange={(e) => setFormData({ ...formData, demoLink: e.target.value })}
                                    />
                                </>
                            )}
                            {activeTab === 'skills' && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Skill Name"
                                        value={formData.name || ''}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Category"
                                        value={formData.category || ''}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        required
                                    />
                                </>
                            )}
                            {activeTab === 'achievements' && (
                                <>
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={formData.title || ''}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Date"
                                        value={formData.date || ''}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                    <textarea
                                        placeholder="Description"
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                    <ImageUpload
                                        onUpload={(url) => setFormData({ ...formData, image: url })}
                                        initialImage={formData.image}
                                    />
                                </>
                            )}
                            <div className="form-actions">
                                <button type="submit" className="btn">Save</button>
                                {editId && (
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => { setFormData({}); setEditId(null); }}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                )}

                <div className="items-list">
                    {items.map((item) => (
                        <div key={item._id} className="item-card card">
                            {item.image && (
                                <div className="item-image" style={{ marginBottom: '1rem' }}>
                                    <img
                                        src={item.image.startsWith('http') ? item.image : `https://gbackend-xeaj.onrender.com${item.image}`}
                                        alt={item.title || item.name}
                                        style={{ maxWidth: '100px', borderRadius: '8px' }}
                                    />
                                </div>
                            )}
                            <div className="item-content">
                                <h3>{item.title || item.name}</h3>
                                {item.description && <p>{item.description}</p>}
                                {item.category && <p><strong>Category:</strong> {item.category}</p>}
                                {item.email && <p><strong>Email:</strong> {item.email}</p>}
                                {item.message && <p><strong>Message:</strong> {item.message}</p>}
                            </div>
                            {activeTab !== 'contact' && (
                                <div className="item-actions">
                                    <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
                                    <button onClick={() => handleDelete(item._id)} className="btn-delete">Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
