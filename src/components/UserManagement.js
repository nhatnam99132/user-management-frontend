import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useParams, useNavigate  } from 'react-router-dom';
import Modal from 'react-modal';
import { getUsers, createUser } from '../apiService';

const columns = [
  {
    name: 'Id',
    selector: row => row.id,
    sortable: true,
  },
  {
    name: 'First Name',
    selector: row => row.firstName,
    sortable: true,
  },
  {
    name: 'Last Name',
    selector: row => row.lastName,
    sortable: true,
  },
  {
    name: 'Joined At',
    selector: row => row.joinedAt,
    sortable: true,
  },
  {
    name: 'Active',
    selector: row => row.isActive ? 'Yes' : 'No',
    sortable: true,
  },
  // Add more columns as needed
];

Modal.setAppElement('#root'); // Set the app element for accessibility

function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState(true);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', joinedAt: '', isActive: false });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setPending(false);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewUser({ ...newUser, [name]: type === 'checkbox' ? checked : value });
  };

  const handleAddUser = async () => {
    try {
      const addedUser = await createUser(newUser);
      setUsers([...users, addedUser]);
      setNewUser({ firstName: '', lastName: '', joinedAt: '', isActive: false });
      setIsModalOpen(false); // Close the modal after adding the user
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleRowClicked = row => {
     navigate(`/user/${row.id}`);
  };

  return (
    <div>
      <h1>User Management</h1>
      <DataTable
        title="Users"
        columns={columns}
        data={users}
        progressPending={pending}
        pagination
        highlightOnHover
        pointerOnHover
        onRowClicked={handleRowClicked}
      />
      <button onClick={() => setIsModalOpen(true)}>Add User</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add New User"
      >
        <h2>Add New User</h2>
        <input
          type="text"
          name="firstName"
          value={newUser.firstName}
          placeholder="First Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          value={newUser.lastName}
          placeholder="Last Name"
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="joinedAt"
          value={newUser.joinedAt}
          onChange={handleInputChange}
        />
        <label>
          Active:
          <input
            type="checkbox"
            name="isActive"
            checked={newUser.isActive}
            onChange={handleInputChange}
          />
        </label>
        <button onClick={handleAddUser}>Create User</button>
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
}

export default UserManagement;
