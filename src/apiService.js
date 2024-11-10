import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL + "/api";

// User CRUD functions

// Get all users
export const getUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Get a specific user by ID
export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

// Create a new user
export const createUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Update an existing user by ID
export const updateUser = async (id, userDetails) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, userDetails);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
};

// Delete a user by ID
export const deleteUser = async (id) => {
  try {
    await axios.delete(`${API_URL}/users/${id}`);
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};

// Token CRUD functions

// Get all tokens
export const getTokens = async () => {
  try {
    const response = await axios.get(`${API_URL}/tokens`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tokens:', error);
    throw error;
  }
};

// Create a new token
export const createToken = async (token) => {
  try {
    const response = await axios.post(`${API_URL}/tokens`, token);
    return response.data;
  } catch (error) {
    console.error('Error creating token:', error);
    throw error;
  }
};

// // Get a specific token by ID
// export const getTokenById = async (id) => {
//   try {
//     const response = await axios.get(`${API_URL}/tokens/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching token with id ${id}:`, error);
//     throw error;
//   }
// };

// // Update an existing token by ID
// export const updateToken = async (id, tokenDetails) => {
//   try {
//     const response = await axios.put(`${API_URL}/tokens/${id}`, tokenDetails);
//     return response.data;
//   } catch (error) {
//     console.error(`Error updating token with id ${id}:`, error);
//     throw error;
//   }
// };

// // Delete a token by ID
// export const deleteToken = async (id) => {
//   try {
//     await axios.delete(`${API_URL}/tokens/${id}`);
//   } catch (error) {
//     console.error(`Error deleting token with id ${id}:`, error);
//     throw error;
//   }
// };
