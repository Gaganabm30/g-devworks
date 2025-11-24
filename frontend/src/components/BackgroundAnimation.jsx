import { motion } from 'framer-motion';
import './BackgroundAnimation.css';

const BackgroundAnimation = ({ icons = [] }) => {
    return (
        <div className="background-animation-container">
            {/* Animated Background Orbs */}
            <div className="bg-orbs">
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
            </div>

            {/* Floating Icons */}
            <div className="floating-icons">
                {icons.map(({ Icon, delay, position }, index) => (
                    <motion.div
                        key={index}
                        className="floating-icon"
                        style={position}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: delay,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            repeatDelay: 2
                        }}
                    >
                        <Icon />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default BackgroundAnimation;
