import { MapPin, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow hover:shadow-lg transition-all duration-200 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      {/* LEFT */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{job.title}</h2>

        <div className="flex items-center gap-3 text-sm text-base-content/60">
          <span className="flex items-center gap-1">
            <Briefcase size={14} />
            {job.company || "Company"}
          </span>

          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {job.location}
          </span>
        </div>

        {/* SKILLS */}
        <div className="flex gap-2 flex-wrap">
          {job.skills?.map((skill, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-base-200 rounded-md"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex gap-2">
        <Link to={`/job/${job._id}`} className="btn btn-ghost btn-sm">
          View
        </Link>
        <button className="btn btn-primary btn-sm rounded-full px-5">
          Apply
        </button>
      </div>
    </div>
  );
};

export default JobCard;