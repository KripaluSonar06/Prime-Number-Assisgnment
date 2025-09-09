import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { questionsData } from '../questionData';
import '../styles/QuestionSelection.css';

const QuestionSelection = ({ completedQuestions }) => {
  const navigate = useNavigate();

  const handleQuestionSelect = (questionId) => {
    navigate(`/question/${questionId}`);
  };

  const handleFinish = () => {
    navigate('/thankyou');
  };

  const questions = [
    { id: 1, title: "Pattern Prime Numbers", description: "Find primes following concatenation pattern" },
    { id: 2, title: "Repunit Primes", description: "Find primes consisting only of 1's" },
    { id: 3, title: "Mersenne Primes", description: "Find primes of form 2^p - 1" },
    { id: 4, title: "Brocard's Conjecture", description: "Four primes between consecutive prime squares" },
    { id: 5, title: "Palindromic Primes", description: "Find palindromic prime numbers" },
    { id: 6, title: "Perfect Numbers", description: "Find perfect numbers using Mersenne primes" },
    { id: 7, title: "Prime Conjectures", description: "Various famous prime conjectures" }
  ];

  const completedCount = completedQuestions.size;

  return (
    <div className="question-selection">
      <motion.h1 
        className="page-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Prime Numbers Assignment
      </motion.h1>

      <motion.div 
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div 
          className="progress-fill"
          style={{ width: `${(completedCount / questions.length) * 100}%` }}
        />
        <span className="progress-text">
          {completedCount}/{questions.length} Questions Completed
        </span>
      </motion.div>

      <div className="questions-grid">
        {questions.map((question, index) => (
          <motion.div
            key={question.id}
            className={`question-card ${completedQuestions.has(question.id) ? 'completed' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            onClick={() => handleQuestionSelect(question.id)}
          >
            <div className="question-number">Q{question.id}</div>
            <div className="question-title">{question.title}</div>
            <div className="question-description">{question.description}</div>
            {completedQuestions.has(question.id) && (
              <motion.div 
                className="completed-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {completedCount === questions.length && (
        <motion.button
          className="finish-button"
          onClick={handleFinish}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎉 Complete Assignment 🎉
        </motion.button>
      )}
    </div>
  );
};

export default QuestionSelection;