import axios from 'axios';
import type { User, Comment } from './types'; // Added 'type' keyword

const API_BASE = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_BASE}/users`);
  return response.data;
};

export const fetchComments = async (): Promise<Comment[]> => {
  const response = await axios.get(`${API_BASE}/comments`);
  return response.data;
};