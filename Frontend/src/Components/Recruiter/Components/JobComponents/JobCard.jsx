import { Link } from "react-router-dom";
import { Briefcase, Clock } from "lucide-react";

const JobCard = ({ job, onClose, onDelete }) => {

  const getDaysAgo = (date) => {
    const diff = new Date() - new Date(date);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days === 0 ? "Today" : `${days} days ago`;
  };

  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow hover:shadow-md transition flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

      {/* LEFT */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">{job.title}</h2>

        <div className="flex flex-wrap gap-3 text-sm text-base-content/70">

          <span className="flex items-center gap-1">
            <Briefcase size={14} />
            {job.role}
          </span>

          <span className="text-xs bg-base-200 px-2 py-1 rounded-md">
            {job.experience} yrs
          </span>

          <span
            className={`text-xs px-2 py-1 rounded-md font-medium ${
              job.status === "open"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {job.status.toUpperCase()}
          </span>

        </div>

        <p className="text-sm text-base-content/60">
          {job.totalApplication} applicants
        </p>

        <p className="text-xs text-base-content/50 flex items-center gap-1">
          <Clock size={12} />
          Posted {getDaysAgo(job.createdAt)}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap gap-2">

        <Link
          to={`/recruiter/job/${job._id}/applications`}
          className="btn btn-outline btn-sm"
        >
          Applications
        </Link>

        <Link
          to={`/recruiter/job/edit/${job._id}`}
          className="btn btn-sm"
        >
          Edit
        </Link>

        <button
          onClick={() => onClose(job)}
          className={`btn btn-sm ${
            job.status === "open"
              ? "btn-warning"
              : "btn-success"
          }`}
        >
          {job.status === "open" ? "Close" : "Reopen"}
        </button>

        <button
          onClick={() => onDelete(job._id)}
          className="btn btn-sm btn-error"
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default JobCard;