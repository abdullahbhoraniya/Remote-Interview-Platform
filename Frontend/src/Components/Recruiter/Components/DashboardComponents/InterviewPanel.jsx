const interviews = [
  { id: 1, name: "Rahul", time: "2:00 PM", type: "Coding" },
  { id: 2, name: "Priya", time: "4:00 PM", type: "Video" }
];

const InterviewPanel = () => {
  return (
    <div className="bg-base-100 p-5 rounded-xl shadow space-y-3">

      <h2 className="font-semibold text-lg">Today’s Interviews</h2>

      {interviews.map((i) => (
        <div
          key={i.id}
          className="flex justify-between items-center bg-base-200 p-3 rounded-lg"
        >
          <div>
            <p className="font-medium">{i.name}</p>
            <p className="text-xs text-base-content/60">
              {i.type} • {i.time}
            </p>
          </div>

          <button className="btn btn-primary btn-xs">
            Start
          </button>
        </div>
      ))}

    </div>
  );
};

export default InterviewPanel;