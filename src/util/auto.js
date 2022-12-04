// all axios methods

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
});

export default instance;

// get all users
export const getAllUsers = () => {
  return instance.get('/users');
};

// get user by id
export const getUserById = (id) => {
  return instance.get(`/users/${id}`);
};

// create user
export const createUser = (user) => {
  return instance.post('/users', user);
};

// update user
export const updateUser = (id, user) => {
  return instance.put(`/users/${id}`, user);
};

// delete user
export const deleteUser = (id) => {
  return instance.delete(`/users/${id}`);
};

// get all posts
export const getAllPosts = () => {
  return instance.get('/posts');
};

// axios post with headers
export const axiosPostWithHeaders = () => {
  return instance.post(
    '/posts',
    {
      title: 'foo',
      body: 'bar',
      userId: 1,
    },
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
};

// axios post with headers
export const _axiosPostWithHeaders = () => {
  return instance.post(
    '/posts',
    {
      title: 'foo',
      body: 'bar',
      userId: 1,
    },
    {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  );
};
