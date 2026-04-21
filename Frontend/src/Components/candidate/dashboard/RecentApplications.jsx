import React from 'react'

const RecommendedJobCards = ({role,prerequisites,mode,status}) => {
    return (
        <div className="flex justify-between items-center p-3 bg-base-200 rounded-lg">
            <div>
                <p className="font-medium">{role}</p>
                <p className="text-xs text-base-content/60">{prerequisites}•{mode}</p>
            </div>
            <span className="badge badge-success">{status}</span>
        </div>

    )
}

export default RecommendedJobCards
