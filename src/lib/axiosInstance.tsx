// lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ,
  // withCredentials: true, 
  headers: {
    "accept": "application/json",
  },
});

export default api;
