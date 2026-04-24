import React, { useEffect, useState } from "react";
import JobHeader from "./JobHeader";
import JobList from "./JobList";
import Pagination from "./Pagination";
import FiltersSidebar from "./FiltersSidebar";
import { getJobs } from "../../../api/candidate";
import { ChartNoAxesColumnDecreasing } from "lucide-react";



const CandidateJobPortal = () => {

  const [jobs,setJobs]=useState([]);

  useEffect(()=>{
    const fetchJobs=async()=>{
      try {
        const res=await getJobs();
        console.log("Response:",res)
        setJobs(res)
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }

    fetchJobs();
  },[])

  return (
    <div className="min-h-screen bg-base-200 p-6 space-y-6">

      <JobHeader />

      <FiltersSidebar/>

      <JobList jobs={jobs} />

      <Pagination />

    </div>
  );
};

export default CandidateJobPortal;