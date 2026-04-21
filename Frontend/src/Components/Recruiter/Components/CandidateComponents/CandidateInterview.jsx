const CandidateInterview = ({ codingScore, communication }) => {
  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow space-y-2">

      <h2 className="font-semibold text-lg">
        Interview Performance
      </h2>

      <p className="text-sm">
        Coding Score: <span className="font-medium">{codingScore}</span>
      </p>

      <p className="text-sm">
        Communication: <span className="font-medium">{communication}</span>
      </p>

    </div>
  );
};

export default CandidateInterview;