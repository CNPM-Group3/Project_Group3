// src/api/auth.ts
import axios from "axios";

const API_BASE = "https://657b-115-77-159-170.ngrok-free.app/api";

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${API_BASE}/auth/login`, {
    username,
    password
  });
  return res.data; // thường trả về token
};
export const register = async (Name: string, email: string, password: string) => {
  const res = await axios.post(`${API_BASE}/Auth/register`, {
    name: Name,
    email,
    password
  });
  return res.data;
};
