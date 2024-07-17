import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import CharacterList from './Components/CharacterList';
import CharacterDetails from './Components/CharacterDetails';

function App() {
  return (
    <Router>
      <div className="uppercase text-center text-4xl font-bold">
        <h1>Ricky and Morty</h1>
      </div>
      <Routes> 
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterDetails />} />
      </Routes>
    </Router>
  );
}

export default App;