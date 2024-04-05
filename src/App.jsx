import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Boards from './components/Boards';
import BoardLists from './components/BoardsList';
import './App.css'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Boards />}
          />
          <Route path="/boards/:boardId" element={<BoardLists />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
