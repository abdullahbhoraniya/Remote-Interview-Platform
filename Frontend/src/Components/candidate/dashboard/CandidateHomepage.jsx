import React, { useState } from "react";
import RecommendedJobCards from "./RecentApplications";
import CandidateStatCards from "./CandidateStatCards";
import { Link } from "react-router-dom";
import RecommendedJobs from "./RecommendedJobs";
const CandidateDashboard = () => {

    const [application, setApplication] = useState(0);
    const [shortListed, setShortListed] = useState(0);
    const [interviews, setinterviews] = useState(0);
    const [rejected, setRejected] = useState(0);

    return (
        <div className="space-y-6">

            {/* 🔥 HEADER */}
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-base-content/60 text-sm">
                    Track your applications and discover new opportunities.
                </p>
            </div>

            {/* 🔥 STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <CandidateStatCards heading={"Applications"} stats={application} color={"text-white"} />
                <CandidateStatCards heading={"ShortListed"} stats={shortListed} color={"text-primary"} />
                <CandidateStatCards heading={"Interview"} stats={interviews} color={"text-warning"} />
                <CandidateStatCards heading={"Rejected"} stats={rejected} color={"text-error"} />
            </div>

            {/* 🔥 MAIN GRID */}
            <div className="grid md:grid-cols-3 gap-6">

                {/* 🔥 LEFT (APPLICATIONS) */}
                <div className="md:col-span-2 bg-base-100 p-5 rounded-xl shadow">

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-lg">Recent Applications</h2>
                        <button className="text-sm text-primary">View All</button>
                    </div>

                    <div className="space-y-3">

                        <RecommendedJobCards role={"Backend Developer"} prerequisites={"Node"} mode={'hybrid'} status={'Interview'} />
                    </div>
                </div>

                {/* 🔥 RIGHT (RECOMMENDED JOBS) */}
                <div className="bg-base-100 p-5 rounded-xl shadow">

                    <h2 className="font-semibold text-lg mb-4">Recommended Jobs</h2>

                    <div className="space-y-3">

                        {/* JOB CARD */}
                        
                        <RecommendedJobs Role={'Asp.net developer'} Experience={"2"} mode={"Hybrid"} id={"abdullahJibPortal"}/>
                        
                    </div>
                </div>
            </div>

        </div>
    );
};

export default CandidateDashboard;