const JobFilters = () => {
  return (
    <div className="flex flex-col md:flex-row gap-3">

      <input
        type="text"
        placeholder="Search jobs..."
        className="input input-bordered w-full md:w-72"
      />

      <select className="select select-bordered w-full md:w-40">
        <option value="">All</option>
        <option value="open">Open</option>
        <option value="closed">Closed</option>
      </select>

    </div>
  );
};

export default JobFilters;