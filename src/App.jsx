import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Proskjekter from './pages/Proskjekter';

function App() {
  const [language, setLanguage] = useState('no');

  return (
    <Router>
      <div className="bg-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Home language={language} setLanguage={setLanguage} />} />
          <Route path="/proskjekter" element={<Proskjekter language={language} setLanguage={setLanguage} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;