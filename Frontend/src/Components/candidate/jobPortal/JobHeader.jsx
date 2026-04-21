import { Search } from "lucide-react";

const JobHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Find your next role
        </h1>
        <p className="text-base-content/60 text-sm">
          Discover opportunities tailored for you
        </p>
      </div>

      <div className="flex items-center gap-2 bg-base-100 px-4 py-2 rounded-xl shadow w-full md:w-96">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search jobs, skills..."
          className="bg-transparent outline-none w-full text-sm"
        />
      </div>

    </div>
  );
};

export default JobHeader;