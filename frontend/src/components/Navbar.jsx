import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes, FaUserShield } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="Logo" className="navbar-logo" />
                </Link>
                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item"><Link to="/" onClick={toggleMenu}>Home</Link></li>
                    <li className="nav-item"><Link to="/about" onClick={toggleMenu}>About</Link></li>
                    <li className="nav-item"><Link to="/skills" onClick={toggleMenu}>Skills</Link></li>
                    <li className="nav-item"><Link to="/projects" onClick={toggleMenu}>Projects</Link></li>
                    <li className="nav-item"><Link to="/achievements" onClick={toggleMenu}>Achievements</Link></li>
                    <li className="nav-item"><Link to="/resume" onClick={toggleMenu}>Resume</Link></li>
                    <li className="nav-item"><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
                    <li className="nav-item admin-item">
                        <Link to="/admin/login" onClick={toggleMenu} className="admin-link">
                            <FaUserShield /> Admin
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
