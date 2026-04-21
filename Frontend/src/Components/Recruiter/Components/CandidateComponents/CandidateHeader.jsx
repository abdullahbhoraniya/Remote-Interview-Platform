const CandidateHeader = ({ name, position, status }) => {
  return (
    <div className="flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-sm text-base-content/60">
          Applied for {position}
        </p>
      </div>

      <span className="badge badge-success">
        {status}
      </span>

    </div>
  );
};

export default CandidateHeader;