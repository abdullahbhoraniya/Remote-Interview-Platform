const steps = ["applied", "shortlisted", "interview", "selected"];

const CandidateTimeline = ({ status = "shortlisted" }) => {
  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow">

      <h2 className="font-semibold text-lg mb-3">
        Hiring Progress
      </h2>

      <div className="flex items-center gap-2">
        {steps.map((step, index) => {
          const active = steps.indexOf(status) >= index;

          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  active ? "bg-primary" : "bg-base-300"
                }`}
              />
              {index !== steps.length - 1 && (
                <div className="w-6 h-[2px] bg-base-300" />
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CandidateTimeline;