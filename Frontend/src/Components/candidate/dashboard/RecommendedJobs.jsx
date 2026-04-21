import React from 'react'
import { Link } from 'react-router-dom'
const RecommendedJobs = ({Role,Experience,mode,id}) => {
  return (
       <div className="p-3 bg-base-200 rounded-lg">
                            <p className="font-medium">{Role}</p>
                            <p className="text-xs text-base-content/60">{Experience}+ years • {mode}</p>

                            <div className="flex gap-2 mt-3">
                                {/* 🔍 VIEW DETAILS */}
                                <Link
                                    to={`/job/${id}`}
                                    className="btn btn-outline btn-xs"
                                >
                                    View
                                </Link>

                                {/* 🚀 APPLY */}
                                <button className="btn btn-primary btn-xs">
                                    Apply
                                </button>
                            </div>
                        </div>

  )
}

export default RecommendedJobs
