import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import UserDetail from './components/UserDetail';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/user/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
