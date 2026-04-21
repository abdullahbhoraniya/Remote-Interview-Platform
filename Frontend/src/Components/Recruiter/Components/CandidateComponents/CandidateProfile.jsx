const CandidateProfile = ({ experience, email, resumeLink }) => {
  return (
    <div className="bg-base-100 p-5 rounded-2xl shadow space-y-2">

      <h2 className="font-semibold text-lg">Profile</h2>

      <p className="text-sm text-base-content/70">
        Experience: {experience}
      </p>

      <p className="text-sm text-base-content/70">
        Email: {email}
      </p>

      <button className="btn btn-sm btn-outline mt-2">
        View Resume
      </button>

    </div>
  );
};

export default CandidateProfile;