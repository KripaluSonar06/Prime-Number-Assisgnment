import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import QuestionSelection from './components/QuestionSelection';
import QuestionDetail from './components/QuestionDetail';
import ThankYouPage from './components/ThankYouPage';
import ParticleSystem from './components/ParticleSystem';
import './styles/App.css';

function App() {
  const [completedQuestions, setCompletedQuestions] = useState(new Set());

  const handleQuestionComplete = (questionId) => {
    setCompletedQuestions(prev => new Set([...prev, questionId]));
  };

  return (
    <Router>
      <div className="App">
        <ParticleSystem />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/questions" element={
            <QuestionSelection 
              completedQuestions={completedQuestions}
            />
          } />
          <Route path="/question/:id" element={
            <QuestionDetail 
              onComplete={handleQuestionComplete}
            />
          } />
          <Route path="/thankyou" element={<ThankYouPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;