const jobs = [
  { name: "Frontend Dev", apps: 25, shortlisted: 5 },
  { name: "Backend Dev", apps: 18, shortlisted: 3 }
];

const JobPerformance = () => {
  return (
    <div className="bg-base-100 p-5 rounded-xl shadow space-y-3">

      <h2 className="font-semibold text-lg">Job Performance</h2>

      {jobs.map((job, i) => (
        <div key={i} className="bg-base-200 p-3 rounded-lg">
          <p className="font-medium">{job.name}</p>
          <p className="text-xs text-base-content/60">
            {job.apps} applicants • {job.shortlisted} shortlisted
          </p>
        </div>
      ))}

    </div>
  );
};

export default JobPerformance;