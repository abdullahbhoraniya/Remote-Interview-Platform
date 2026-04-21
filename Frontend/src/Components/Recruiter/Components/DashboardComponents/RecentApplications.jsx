import ApplicationItem from "./ApplicationItem";

const data = [
  { id: 1, name: "Rahul", role: "Backend Dev", score: 82 },
  { id: 2, name: "Priya", role: "Frontend Dev", score: 76 }
];

const RecentApplications = () => {
  return (
    <div className="bg-base-100 p-5 rounded-xl shadow space-y-3">
      <h2 className="font-semibold text-lg">
        Recent Applications
      </h2>

      {data.map((app) => (
        <ApplicationItem key={app.id} app={app} />
      ))}
    </div>
  );
};

export default RecentApplications;