import CandidateActions from "../Components/CandidateComponents/CandidateActions";
import CandidateHeader from "../Components/CandidateComponents/CandidateHeader";
import CandidateInterview from "../Components/CandidateComponents/CandidateInterview";
import CandidateProfile from "../Components/CandidateComponents/CandidateProfile";
import CandidateSkills from "../Components/CandidateComponents/CandidateSkills";
import CandidateTimeline from "../Components/CandidateComponents/CandidateTimeline";

const CandidatePanel = ({ candidate }) => {
  return (
    <div className="min-h-screen bg-base-200 p-6 space-y-6">

      <CandidateHeader name={candidate.name} position={candidate.position} status={candidate.status} />

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="space-y-6">
          <CandidateProfile experience={candidate.experience} email={candidate.email} resumeLink={candidate.resume} />
          <CandidateSkills skills={candidate.skills} />
        </div>

        {/* RIGHT */}
        <div className="md:col-span-2 space-y-6">
          <CandidateTimeline status={candidate.status.toLowerCase()} />
          <CandidateInterview codingScore={candidate.codingScore} communication={candidate.communication} />
          <CandidateActions />
        </div>

      </div>

    </div>
  );
};

export default CandidatePanel;