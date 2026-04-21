import { Link } from "react-router-dom";
import StatusTimeline from "./StatusTimeline";

const statusColor = {
  applied: "badge-info",
  shortlisted: "badge-success",
  interview: "badge-warning",
  rejected: "badge-error"
};

const ApplicationCard = ({ app }) => {
  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow hover:shadow-md transition flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      {/* LEFT */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">
          {app.jobTitle}
        </h2>

        <p className="text-sm text-base-content/60">
          Applied on {app.date}
        </p>

        {/* TIMELINE */}
        <StatusTimeline status={app.status} />
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-start md:items-end gap-2">

        {/* STATUS */}
        <span className={`badge ${statusColor[app.status]}`}>
          {app.status}
        </span>

        {/* ACTIONS */}
        <div className="flex gap-2">
          <Link
            to={`/job/${app.jobId}`}
            className="btn btn-ghost btn-sm"
          >
            View
          </Link>

          {app.status === "interview" && (
            <button className="btn btn-primary btn-sm">
              Start
            </button>
          )}
        </div>
      </div>

    </div>
  );
};

export default ApplicationCard;