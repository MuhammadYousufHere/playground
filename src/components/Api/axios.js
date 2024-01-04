import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPostPage = async (page = 1) => {
  const { data } = await axiosInstance.get(`posts?_page=${page}`);
  return data;
};

export const axiosInstanceTwo = axios.create({
  baseURL: 'https://reqres.in/api',
});

export const getUserPage = async (page = 1) => {
  const { data } = await axiosInstanceTwo.get(`/users?page=${page}`);
  return data;
};
