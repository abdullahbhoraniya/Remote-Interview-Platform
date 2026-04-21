import InterviewHeader from "../Components/InterviewComponents/InterviewHeader";
import InterviewList from "../Components/InterviewComponents/InterviewList";
import InterviewTabs from "../Components/InterviewComponents/InterviewTabs";

const InterviewPage = () => {

  return (
    <div className="min-h-screen bg-base-200 p-6 space-y-6">

      <InterviewHeader />

      <InterviewTabs />

      <InterviewList />

    </div>
  );
};

export default InterviewPage;

