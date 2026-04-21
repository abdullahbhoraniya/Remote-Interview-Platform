const ApplicationItem = ({ app }) => {
  return (
    <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">

      <div>
        <p className="font-medium">{app.name}</p>
        <p className="text-xs text-base-content/60">
          {app.role} • Score: {app.score}
        </p>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-xs">View</button>
        <button className="btn btn-xs btn-success">Shortlist</button>
        <button className="btn btn-xs btn-error">Reject</button>
      </div>

    </div>
  );
};

export default ApplicationItem;