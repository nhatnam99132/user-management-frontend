import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import { getUserById, updateUser, deleteUser } from '../apiService'; // Import API functions
import Modal from 'react-modal'; // Assuming you're using react-modal

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        setUser(data);
        setUpdatedUser(data);
      } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
      }
    };

    fetchUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      await updateUser(id, updatedUser);
      setUser(updatedUser);
      setIsModalOpen(false);
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        navigate('/users'); // Redirect to users list after deletion
      } catch (error) {
        console.error(`Error deleting user with id ${id}:`, error);
      }
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Detail for ID: {id}</h1>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      <p>Joined At: {user.joinedAt}</p>
      <p>Active: {user.isActive ? 'Yes' : 'No'}</p>
      <button onClick={() => setIsModalOpen(true)}>Update User</button>
      <button onClick={handleDeleteUser}>Delete User</button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Update User"
      >
        <h2>Update User</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
          <input
            type="text"
            name="firstName"
            value={updatedUser.firstName}
            placeholder="First Name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            value={updatedUser.lastName}
            placeholder="Last Name"
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="joinedAt"
            value={updatedUser.joinedAt}
            onChange={handleInputChange}
          />
          <label>
            Active:
            <input
              type="checkbox"
              name="isActive"
              checked={updatedUser.isActive}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
}

export default UserDetail;
