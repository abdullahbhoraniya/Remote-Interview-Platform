import { useState } from "react";

import ApplicationHeader from "./ApplicationHeader";
import StatusTabs from "./StatusTabs";
import ApplicationList from "./ApplicationList";

const data = [
  {
    id: 1,
    jobTitle: "Frontend Developer",
    jobId: "1",
    status: "applied",
    date: "2 days ago"
  },
  {
    id: 2,
    jobTitle: "Backend Engineer",
    jobId: "2",
    status: "shortlisted",
    date: "5 days ago"
  },
  {
    id: 3,
    jobTitle: "React Intern",
    jobId: "3",
    status: "interview",
    date: "1 week ago"
  }
];

const ApplicationPage = () => {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? data
      : data.filter(
          (a) => a.status.toLowerCase() === active.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-base-200 p-6 space-y-6">

      <ApplicationHeader />

      <StatusTabs active={active} setActive={setActive} />

      <ApplicationList applications={filtered} />

    </div>
  );
};

export default ApplicationPage;