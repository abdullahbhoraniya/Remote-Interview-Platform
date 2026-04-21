const steps = ["applied", "shortlisted", "interview", "selected"];

const StatusTimeline = ({ status }) => {
  return (
    <div className="flex items-center gap-2 mt-3">
      {steps.map((step, index) => {
        const active = steps.indexOf(status) >= index;

        return (
          <div key={index} className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
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
  );
};

export default StatusTimeline;