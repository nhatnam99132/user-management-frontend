import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to User Management System</h1>
      <Link to="/user">Go to User Management</Link>
    </div>
  );
}

export default Home;
