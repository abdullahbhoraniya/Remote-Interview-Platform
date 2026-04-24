import { useEffect, useState } from "react";
import JobFilters from "../Components/JobComponents/JobFilters";
import JobList from "../Components/JobComponents/JobList";
import JobPortalHeader from "../Components/JobComponents/JobPortalHeader";
import Pagination from "../Components/JobComponents/Pagination";
import { getMyJobs } from "../../../api/recruiter";

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const res = await getMyJobs({ page, limit: 10 });

      setJobs(res?.data || []);
      setTotalPages(res?.meta?.totalPages || 1);

    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  return (
    <div className="min-h-screen bg-base-200 p-6 space-y-6">

      <JobPortalHeader />

      <JobFilters />

      {/* 🔄 Loading */}
      {loading ? (
        <div>Loading jobs...</div>
      ) : (
        <JobList jobs={jobs} />
      )}

      {/* 📄 Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

    </div>
  );
};

export default JobPortal;