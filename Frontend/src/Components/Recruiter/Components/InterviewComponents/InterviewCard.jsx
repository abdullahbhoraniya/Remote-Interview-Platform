import { useNavigate } from "react-router-dom";

const statusColor = {
  scheduled: "badge-info",
  ongoing: "badge-warning",
  completed: "badge-success"
};

const InterviewCard = ({ interview }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-base-100 p-5 rounded-xl shadow flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      {/* LEFT */}
      <div>
        <h2 className="font-semibold">
          {interview.candidateName}
        </h2>

        <p className="text-sm text-base-content/60">
          {interview.jobTitle} • {interview.type}
        </p>

        <p className="text-xs text-base-content/50">
          {new Date(interview.time).toLocaleString()}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2">

        <span className={`badge ${statusColor[interview.status]}`}>
          {interview.status}
        </span>

        {interview.status === "scheduled" && (
          <button
            onClick={() => navigate(`/interview/${interview._id}`)}
            className="btn btn-primary btn-sm"
          >
            Start
          </button>
        )}

        {interview.status === "completed" && (
          <button className="btn btn-outline btn-sm">
            View
          </button>
        )}

      </div>

    </div>
  );
};

export default InterviewCard;