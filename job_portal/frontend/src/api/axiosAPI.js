// src/api/axiosAPI.js
import axios from "axios";

// ✅ Create a single axios instance
const API = axios.create({
  baseURL: "https:https://job-portal-backend-15.onrender.com", 
  // Example: .env → VITE_API_BASE_URL=http://localhost:5000/api/v1
});

// ✅ Attach token automatically
API.interceptors.request.use((req) => {
  const storedData = localStorage.getItem("token"); // saved as { user, token }
  if (storedData) {
    const token = storedData;
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
  }
  return req;
});

export const updateApplicationStatusAPI = (appId, status) =>
  API.patch(`/applications/${appId}/status`,{status});


// 🔹 Fetch all jobs (supports filters & pagination)
export const fetchJobsAPI = (filters = {}) =>
  API.get("/jobs", { params: filters });



export default API;
