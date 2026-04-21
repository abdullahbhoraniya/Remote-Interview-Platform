const tabs = ["All", "Applied", "Shortlisted", "Interview", "Rejected"];

const StatusTabs = ({ active, setActive }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-4 py-1 rounded-full text-sm transition ${
            active === tab
              ? "bg-primary text-white"
              : "bg-base-100 shadow hover:bg-base-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default StatusTabs;