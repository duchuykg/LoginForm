import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './component/Login';

const App = () => {
  return (
    <Router>
      <div className="App-container">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<LoginForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;