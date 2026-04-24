import { MapPin, Briefcase, IndianRupee, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../../../../api/candidate";

const JobDetailPage = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const res = await getJobById(id);
        setJob(res?.data);
      } catch (err) {
        setError("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJobById();
  }, [id]);

  const getDaysAgo = (date) => {
    const diff = new Date() - new Date(date);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-error">{error}</div>;
  if (!job) return <div className="p-6 text-error">Job not found</div>;

  return (
    <div className="w-full min-h-screen bg-base-200 px-4 md:px-8 lg:px-16 py-6">

      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">

          {/* HEADER */}
          <div className="bg-base-100 p-6 rounded-2xl shadow space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>

            <div className="flex flex-wrap gap-3 text-sm text-base-content/70">

              <span className="flex items-center gap-1">
                <Briefcase size={16} />
                {job.role}
              </span>

              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {job.location}
              </span>

              <span className="flex items-center gap-1">
                <IndianRupee size={16} />
                {job.salaryRange?.min} - {job.salaryRange?.max} LPA
              </span>

              <span className="bg-base-200 px-2 py-1 rounded-md">
                {job.experience} yrs
              </span>

              <span className="flex items-center gap-1">
                <Clock size={16} />
                {getDaysAgo(job.createdAt)} days ago
              </span>
            </div>

            {/* STATUS */}
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                job.status === "open"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {job.status.toUpperCase()}
            </span>
          </div>

          {/* DESCRIPTION */}
          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-3">About the Role</h2>
            <p className="text-base-content/80 leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* SKILLS */}
          <div className="bg-base-100 p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-3">Skills Required</h2>

            <div className="flex flex-wrap gap-2">
              {job.skills?.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm bg-base-200 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-9">

          {/* APPLY CARD */}
          <div className="bg-base-100 p-8 rounded-2xl shadow lg:sticky lg:top-20 space-y-4">

            <p className="text-sm text-base-content/60">
              {job.totalApplication} applicants
            </p>

            <button
              disabled={job.status !== "open"}
              className={`btn w-full ${
                job.status === "open"
                  ? "btn-primary"
                  : "btn-disabled"
              }`}
            >
              {job.status === "open" ? "Apply Now" : "Closed"}
            </button>

            <button className="btn btn-outline w-full">
              Save Job
            </button>
          </div>

          {/* INFO CARD */}
          <div className="bg-base-100 p-6 rounded-2xl shadow text-sm space-y-3">
            <p><strong>Experience:</strong> {job.experience} years</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p>
              <strong>Salary:</strong> ₹{job.salaryRange?.min} - ₹{job.salaryRange?.max} LPA
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;