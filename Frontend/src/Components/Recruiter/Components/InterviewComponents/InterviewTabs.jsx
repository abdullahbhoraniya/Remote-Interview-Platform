import { useInterviewStore } from "./store/interview.store";

\
const tabs = ["All", "Today", "Upcoming", "Completed"];

const InterviewTabs = () => {
  const { activeTab, setActiveTab } = useInterviewStore();

  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-1 rounded-full text-sm ${
            activeTab === tab
              ? "bg-primary text-white"
              : "bg-base-100 shadow"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default InterviewTabs;