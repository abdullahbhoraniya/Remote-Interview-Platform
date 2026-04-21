import InterviewCard from "./InterviewCard";
import { useInterviewStore } from "./store/interview.store";

const InterviewList = () => {
  const { interviews, loading, activeTab } = useInterviewStore();

  if (loading) return <p>Loading...</p>;

  const filtered = interviews.filter((i) => {
    if (activeTab === "All") return true;

    if (activeTab === "Completed") return i.status === "completed";

    if (activeTab === "Upcoming")
      return new Date(i.time) > new Date();

    if (activeTab === "Today") {
      const today = new Date().toDateString();
      return new Date(i.time).toDateString() === today;
    }

    return true;
  });

  if (filtered.length === 0) {
    return (
      <p className="text-center text-base-content/60">
        No interviews found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {filtered.map((i) => (
        <InterviewCard key={i._id} interview={i} />
      ))}
    </div>
  );
};

export default InterviewList;