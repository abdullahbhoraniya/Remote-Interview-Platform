
import ApplicationCard from "./ApplicationCard";
import EmptyState from "./EmptyState";

const ApplicationList = ({ applications }) => {
  if (!applications || applications.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <ApplicationCard key={app.id} app={app} />
      ))}
    </div>
  );
};

export default ApplicationList;