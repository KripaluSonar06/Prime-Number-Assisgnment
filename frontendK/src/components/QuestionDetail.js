import React, { useState, useEffect, useRef } from 'react';
import { streamFromBackend as streamFrom } from "../api";
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
  const controllerRef = useRef(null);

  useEffect(() => {
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
    setHasRun(false);

    if (controllerRef.current) {
      try { controllerRef.current.abort(); } catch (e) { }
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    try {
      await streamFrom(id, inputs, {
        signal: controller.signal,
        onLine: (line) => {
          setOutput(prev => prev + line + "\n");
          setHasRun(true);
        },
        onError: (err) => {
          setOutput(prev => prev + `\n\n❌ Error: ${err.message || err}\n\nMake sure the backend is running on http://127.0.0.1:8000\n`);
          setIsRunning(false);
        },
        onDone: () => {
          setOutput(prev => prev + "\n=== Done ===\n");
          setIsRunning(false);
          setHasRun(true);
          const baseId = parseInt(id, 10);
          if (!isNaN(baseId)) onComplete(baseId);
        },
      });
    } catch (err) {
      if (err.name !== 'AbortError') {
        setOutput(prev => prev + `\n\n❌ Error: ${err.message || err}\n`);
      } else {
        setOutput(prev => prev + `\n\n⚠️ Stream aborted by user\n`);
      }
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
                    <code>{question.code}</code>
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