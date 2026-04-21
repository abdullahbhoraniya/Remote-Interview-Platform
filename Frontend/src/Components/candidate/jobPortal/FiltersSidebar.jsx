const FiltersSidebar = () => {
  const filters = ["Remote", "Frontend", "Backend", "1-3 yrs"];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((f, i) => (
        <button
          key={i}
          className="px-4 py-1 rounded-full bg-base-100 shadow text-sm hover:bg-primary hover:text-white transition"
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FiltersSidebar;

