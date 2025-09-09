import React, { useEffect, useRef } from 'react';
import '../styles/Terminal.css';

const Terminal = ({ output, isRunning }) => {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <div className="terminal-button red"></div>
          <div className="terminal-button yellow"></div>
          <div className="terminal-button green"></div>
        </div>
        <div className="terminal-title">Prime Numbers Solution Output</div>
        <div className="terminal-status">
          {isRunning ? (
            <span className="status-running">🔄 Running</span>
          ) : (
            <span className="status-ready">✅ Ready</span>
          )}
        </div>
      </div>
      <div className="terminal-body" ref={terminalRef}>
        <div className="terminal-prompt">
          <span className="prompt-symbol">$</span>
          <span className="prompt-text">python3 prime_solver.py</span>
        </div>
        <pre className="terminal-output">
          {output || (isRunning ? 'Executing Python script...\n' : 'Click "Get Solution" to run the Python script.\n\nThe output will appear here in real-time.')}
        </pre>
        {isRunning && (
          <div className="terminal-cursor">
            <span className="blinking">█</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;