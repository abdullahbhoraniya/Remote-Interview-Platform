import { Instance } from "../lib/Instance";

export const createJob = async (payload) => {
  try {
    console.log("Payload:", payload);

    const res = await Instance.post("/recruiter/create-job", payload);

    return res.data;

  } catch (error) {
    console.error("CreateJob API Error:", error);

    // 🔥 Extract proper backend message
    const message =
      error?.response?.data?.message || "Something went wrong";

    // 🔥 IMPORTANT: propagate error
    throw new Error(message);
  }
};


export const getMyJobs = async (params = {}) => {
  try {
    const res = await Instance.get("/recruiter/get-my-job", {
      params, // page, limit, status
    });

    return res.data;

  } catch (error) {
    console.error("getMyJobs Error:", error);

    const message =
      error?.response?.data?.message || "Failed to fetch jobs";

    throw new Error(message);
  }
};

export const getMyJobById = async (id) => {
  try {
    const res = await Instance.get(`/recruiter/get-job-by-id/${id}`);

    return res.data;

  } catch (error) {
    console.error("getMyJobById Error:", error);

    const message =
      error?.response?.data?.message || "Failed to fetch job";

    throw new Error(message);
  }
};


export const updateJob = async (id, payload) => {
  try {
    const res = await Instance.put(
      `/recruiter/update-job/${id}`,
      payload
    );

    return res.data;

  } catch (error) {
    console.error("updateJob Error:", error);

    const message =
      error?.response?.data?.message || "Failed to update job";

    throw new Error(message);
  }
};