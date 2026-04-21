import JobFilters from "../Components/JobComponents/JobFilters";
import JobList from "../Components/JobComponents/JobList";
import JobPortalHeader from "../Components/JobComponents/JobPortalHeader";
import Pagination from "../Components/JobComponents/Pagination";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    status: "Open",
    applications: 25,
    shortlisted: 5,
    createdAt: "2 days ago"
  },
  {
    id: 2,
    title: "Backend Engineer",
    status: "Closed",
    applications: 18,
    shortlisted: 3,
    createdAt: "1 week ago"
  }
];

const JobPortal = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6 space-y-6">

      <JobPortalHeader />

      <JobFilters />

      <JobList jobs={jobs} />

      <Pagination />

    </div>
  );
};

export default JobPortal;