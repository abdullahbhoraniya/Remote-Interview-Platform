import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow hover:shadow-md transition flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      {/* LEFT */}
      <div>
        <h2 className="text-lg font-semibold">{job.title}</h2>

        <p className="text-sm text-base-content/60">
          {job.status} • {job.applications} applicants • {job.shortlisted} shortlisted
        </p>

        <p className="text-xs text-base-content/50 mt-1">
          Posted {job.createdAt}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex gap-2 flex-wrap">

        <Link
          to={`/recruiter/job/${job.id}/applications`}
          className="btn btn-outline btn-sm"
        >
          Applications
        </Link>

        <button className="btn btn-sm">
          Edit
        </button>

        <button className="btn btn-sm btn-warning">
          Close
        </button>

        <button className="btn btn-sm btn-error">
          Delete
        </button>

      </div>

    </div>
  );
};

export default JobCard;