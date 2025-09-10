import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    // Auto-hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  return (
    <motion.div 
      className="thank-you-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}
    >
      {/* Animated Confetti Effect */}
      {showConfetti && (
        <div className="confetti-container" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: -50,
                rotate: 0,
                scale: Math.random() * 0.5 + 0.5
              }}
              animate={{ 
                y: window.innerHeight + 50,
                rotate: 360,
                transition: {
                  duration: Math.random() * 3 + 2,
                  ease: "easeOut"
                }
              }}
              style={{
                position: 'absolute',
                width: '10px',
                height: '10px',
                backgroundColor: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4'][Math.floor(Math.random() * 5)],
                borderRadius: Math.random() > 0.5 ? '50%' : '0%'
              }}
            />
          ))}
        </div>
      )}

      <motion.div variants={itemVariants}>
        <h1 style={{ 
          fontSize: '4rem', 
          marginBottom: '2rem',
          background: 'linear-gradient(45deg, #FFD700, #FF6B6B, #4ECDC4)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🎉 Extraordinary Work! 🎉
        </h1>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '1rem',
          color: '#64B5F6'
        }}>
          Assignment Complete!
        </h2>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p style={{ 
          fontSize: '1.3rem', 
          marginBottom: '1rem',
          maxWidth: '600px',
          lineHeight: '1.6'
        }}>
          You have successfully explored the fascinating world of prime numbers and solved all mathematical challenges!
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '3rem',
          color: '#B0BEC5',
          maxWidth: '500px'
        }}>
          From pattern recognition to ancient conjectures, you've demonstrated excellence in computational mathematics.
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(100, 181, 246, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '15px 30px',
            fontSize: '1.2rem',
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '50px',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          🏠 Return Home
        </motion.button>

        <motion.button
          onClick={() => navigate('/questions')}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(255, 215, 0, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '15px 30px',
            fontSize: '1.2rem',
            background: 'linear-gradient(45deg, #FFD700 0%, #FFA500 100%)',
            border: 'none',
            borderRadius: '50px',
            color: '#1a1a2e',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          🔄 Review Solutions
        </motion.button>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        style={{ 
          marginTop: '4rem',
          padding: '2rem',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '500px'
        }}
      >
        <h3 style={{ color: '#64B5F6', marginBottom: '1rem' }}>🏆 Achievement Unlocked</h3>
        <p style={{ color: '#E0E0E0', fontSize: '1rem' }}>
          Prime Number Master - Completed all 7 mathematical challenges with computational excellence!
        </p>
      </motion.div>

      {/* Sound effect placeholder - uncomment and add audio file */}
      {/* 
      <audio autoPlay>
        <source src="/sounds/success.mp3" type="audio/mpeg" />
      </audio>
      */}
    </motion.div>
  );
};

export default ThankYouPage;