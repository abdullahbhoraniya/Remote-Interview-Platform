
import DashboardHeader from "../Components/DashboardComponents/DashboardHeader";
import ActionCards from "../Components/DashboardComponents/ActionCards";
import InterviewPanel from "../Components/DashboardComponents/InterviewPanel";
import JobPerformance from "../Components/DashboardComponents/JobPerformance";
import QuickActions from "../Components/DashboardComponents/QuickActions";
import RecentApplications from "../Components/DashboardComponents/RecentApplications";

const RecruiterDashBoard = () => {
  return (
    <div className="min-h-screen bg-base-200 p-6 space-y-6">

      <DashboardHeader />

      <QuickActions />

      <ActionCards />

      <div className="grid md:grid-cols-3 gap-6">

        <div className="md:col-span-2">
          <RecentApplications />
        </div>

        <div className="space-y-6">
          <InterviewPanel />
          <JobPerformance />
        </div>

      </div>

    </div>
  );
};

export default RecruiterDashBoard;