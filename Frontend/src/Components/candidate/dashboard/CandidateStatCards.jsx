import React from 'react'

const CandidateStatCards = ({ heading,stats, color }) => {
    return (
        <div className="bg-base-100 p-4 rounded-xl shadow">
            <p className={`text-sm text-base-content/60`}>{heading}</p>
            <h2 className={`text-2xl font-bold ${color}`}>{stats}</h2>
        </div>

    )
}

export default CandidateStatCards;
