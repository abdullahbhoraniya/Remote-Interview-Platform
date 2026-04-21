// services/interview.service.js
import axios from "axios";

export const getInterviewsApi = async (filters = {}) => {
  const res = await axios.get("/api/interviews", { params: filters });
  return res.data;
};