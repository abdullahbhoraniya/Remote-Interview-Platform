import { Instance } from "../lib/Instance"

export const getJobs = async () => {
    try {
        const res = await Instance.get('/candidate/getJobs');
        console.log("Response", res.data);
        return res.data?.data ?? [];
    } catch (error) {
        console.log("The error is related to:", error);
        return [];
    }
}

export const getJobById=async(id)=>{
    try {
        if(!id) return;
        const res=await Instance.get(`/candidate/getJobById/${id}`)
        return res.data;
    } catch (error) {
        console.log("Error is related to:",error);
    }
}


