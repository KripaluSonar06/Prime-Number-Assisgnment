import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/questions');
  };

  return (
    <motion.div 
      className="landing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="landing-container">
        <motion.h1 
          className="main-title"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Prime Numbers Assignment
        </motion.h1>

        <motion.div 
          className="team-section"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h2 className="team-title">Presented by:</h2>
          <div className="team-members">
            <div className="team-member">
              <span className="member-number">1.</span>
              <span className="member-name">xyz</span>
              <span className="member-roll">roll no 1</span>
            </div>
            <div className="team-member">
              <span className="member-number">2.</span>
              <span className="member-name">yzx</span>
              <span className="member-roll">roll no 2</span>
            </div>
            <div className="team-member">
              <span className="member-number">3.</span>
              <span className="member-name">zxy</span>
              <span className="member-roll">roll no 3</span>
            </div>
          </div>
        </motion.div>

        <motion.button
          className="start-button"
          onClick={handleStart}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Assignment
        </motion.button>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span>Click to begin your mathematical journey</span>
          <div className="scroll-arrow">✨</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;