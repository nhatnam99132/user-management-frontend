import React, { useEffect, useState } from 'react';
import { getUsers, createUser } from './apiService';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    const newUser = { /* user data */ };
    try {
      const createdUser = await createUser(newUser);
      setUsers([...users, createdUser]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
}

export default App;
