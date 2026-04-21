import JobCard from "./JobCard";
import EmptyState from "./EmptyState";

const JobList = ({ jobs }) => {
  if (!jobs || jobs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobList;