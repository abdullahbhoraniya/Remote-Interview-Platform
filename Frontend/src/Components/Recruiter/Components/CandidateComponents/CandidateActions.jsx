const CandidateActions = () => {
  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow space-y-3">

      <h2 className="font-semibold text-lg">
        Actions
      </h2>

      <div className="flex gap-2 flex-wrap">
        <button className="btn btn-success btn-sm">
          Shortlist
        </button>

        <button className="btn btn-error btn-sm">
          Reject
        </button>

        <button className="btn btn-primary btn-sm">
          Schedule Interview
        </button>
      </div>

    </div>
  );
};

export default CandidateActions;