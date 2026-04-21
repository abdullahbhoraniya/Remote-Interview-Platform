const QuickActions = () => {
  return (
    <div className="flex gap-2 flex-wrap">
      <button className="btn btn-primary btn-sm">
        + Create Job
      </button>
      <button className="btn btn-outline btn-sm">
        View Applications
      </button>
      <button className="btn btn-outline btn-sm">
        Start Interview
      </button>
    </div>
  );
};

export default QuickActions;