import React from "react";
import JobHeader from "./JobHeader";
import JobList from "./JobList";
import Pagination from "./Pagination";
import FiltersSidebar from "./FiltersSidebar";
const jobs = [
  {
    _id: "1",
    title: "Frontend Developer",
    location: "Remote",
    skills: ["React", "JS"]
  },
  {
    _id: "2",
    title: "Backend Developer",
    location: "Bangalore",
    skills: ["Node", "MongoDB"]
  }
];

const CandidateJobPortal = () => {
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