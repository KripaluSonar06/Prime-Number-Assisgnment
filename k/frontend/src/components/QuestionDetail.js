import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Terminal from './Terminal';
import { questionsData } from '../questionData';
import '../styles/QuestionDetail.css';

const QuestionDetail = ({ onComplete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('question');
  const [inputs, setInputs] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const question = questionsData[id];

  useEffect(() => {
    // Reset state when question changes
    setActiveTab('question');
    setInputs({});
    setOutput('');
    setIsRunning(false);
    setHasRun(false);
  }, [id]);

  const handleInputChange = (name, value) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleRunSolution = async () => {
    setIsRunning(true);
    setActiveTab('solution');
    setOutput('');

    try {
      // For question 7, append the selected type to the question ID
      const questionId = id === '7' ? `7${inputs.type || 'a'}` : id;

      const response = await fetch(`http://localhost:5000/api/execute/${questionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setOutput(prev => prev + chunk);
      }

      setHasRun(true);
      onComplete(parseInt(id));

    } catch (error) {
      setOutput(prev => prev + `\n\n❌ Error: ${error.message}\n\nMake sure the backend server is running on port 5000.\n`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleBack = () => {
    navigate('/questions');
  };

  const renderInputField = (input, index) => {
    if (input.type === 'select') {
      return (
        <div key={index} className="input-group">
          <label>{input.label}:</label>
          <select
            value={inputs[input.name] || ''}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
          >
            <option value="">Select...</option>
            {input.options.map((option, optIndex) => (
              <option key={optIndex} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={index} className="input-group">
        <label>{input.label}:</label>
        <input
          type={input.type}
          placeholder={input.placeholder}
          value={inputs[input.name] || ''}
          onChange={(e) => handleInputChange(input.name, e.target.value)}
          min={input.min}
          max={input.max}
        />
      </div>
    );
  };

  if (!question) {
    return (
      <div className="question-detail">
        <div className="error-message">
          <h2>Question not found</h2>
          <button onClick={handleBack}>← Back to Questions</button>
        </div>
      </div>
    );
  }

  return (
    <div className="question-detail">
      <button className="back-button" onClick={handleBack}>
        ← Back to Questions
      </button>

      <motion.div 
        className="question-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="question-header">
          <h2>Q{id}: {question.title}</h2>
        </div>

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'question' ? 'active' : ''}`}
            onClick={() => setActiveTab('question')}
          >
            Question
          </button>
          <button 
            className={`tab ${activeTab === 'solution' ? 'active' : ''} ${!hasRun ? 'disabled' : ''}`}
            onClick={() => hasRun && setActiveTab('solution')}
          >
            Solution
          </button>
          <button 
            className={`tab ${activeTab === 'hint' ? 'active' : ''}`}
            onClick={() => setActiveTab('hint')}
          >
            Hint
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'question' && (
            <motion.div 
              className="question-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="question-description">{question.description}</p>
              <div className="inputs-section">
                {question.inputs.map((input, index) => renderInputField(input, index))}
                <button 
                  className="run-button"
                  onClick={handleRunSolution}
                  disabled={isRunning}
                >
                  {isRunning ? '🔄 Running...' : '🚀 Get Solution'}
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'solution' && (
            <motion.div 
              className="solution-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Terminal output={output} isRunning={isRunning} />
            </motion.div>
          )}

          {activeTab === 'hint' && (
            <motion.div 
              className="hint-tab"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hint-content">
                <h3>Problem Approach</h3>
                <p>{question.hint}</p>

                <h3>Algorithm Overview</h3>
                <p>{question.algorithm}</p>

                {question.subProblems && (
                  <div className="sub-problems">
                    <h3>Sub-problems (Question 7)</h3>
                    {Object.entries(question.subProblems).map(([key, prob]) => (
                      <div key={key} className="sub-problem">
                        <strong>7{key}: {prob.title}</strong>
                        <p>{prob.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button 
                className="show-code-button"
                onClick={() => setShowCode(!showCode)}
              >
                {showCode ? 'Hide Code' : 'Show Code'}
              </button>

              {showCode && (
                <motion.div 
                  className="code-display"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.5 }}
                >
                  <pre>
                    <code>
{`# Python Solution for Question ${id}: ${question.title}

# This is a placeholder for the actual implementation
# The real Python code is in the backend/python_scripts/ folder

def main():
    # Implementation would be here
    print("Solution code for ${question.title}")
    print("Check backend/python_scripts/${id === '7' ? '7a-7f' : id}.py for actual implementation")

if __name__ == "__main__":
    main()`}
                    </code>
                  </pre>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default QuestionDetail;