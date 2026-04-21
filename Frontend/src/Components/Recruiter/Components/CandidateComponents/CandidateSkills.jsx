const CandidateSkills = ({ skills }) => {
  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow">

      <h2 className="font-semibold text-lg mb-2">Skills</h2>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs bg-base-200 rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>

    </div>
  );
};

export default CandidateSkills;