import React from 'react'
import Navbar from '../Components/Navbar'
import { PROBLEMS } from '../data/problems'
import { Link } from 'react-router-dom'
import { getDifficultyColor } from '../lib/utils'

const ProblemsPage = () => {
  const problems = Object.values(PROBLEMS);

  const easy = problems.filter(p => p.difficulty === "Easy").length;
  const medium = problems.filter(p => p.difficulty === "Medium").length;
  const hard = problems.filter(p => p.difficulty === "Hard").length;

  return (
    <div className='min-h-screen bg-base-200'>
      <Navbar />

      <div className='max-w-6xl mx-auto px-4 py-10'>

        {/* Header */}
        <div className='mb-6'>
          <h1 className='text-3xl font-bold'>Practice Problems</h1>
          <p className='text-base-content/60 text-sm'>
            Solve problems and improve your skills
          </p>
        </div>

        {/* Stats (compact like LeetCode) */}
        <div className="flex gap-6 text-sm mb-6">
          <span>Total: <b>{problems.length}</b></span>
          <span className="text-success">Easy: <b>{easy}</b></span>
          <span className="text-warning">Medium: <b>{medium}</b></span>
          <span className="text-error">Hard: <b>{hard}</b></span>
        </div>

        {/* Table */}
        <div className="bg-base-100 rounded-lg overflow-hidden border border-base-300">

          {/* Header row */}
          <div className="grid grid-cols-12 px-4 py-3 text-sm font-semibold border-b border-base-300 bg-base-200">
            <div className="col-span-6">Title</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-3 text-right">Difficulty</div>
          </div>

          {/* Rows */}
          {problems.map((problem, index) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="grid grid-cols-12 px-4 py-3 text-sm items-center border-b border-base-300 hover:bg-base-200 transition"
            >
              {/* Title */}
              <div className="col-span-6 flex items-center gap-3">
                <span className="text-base-content/40 w-6">
                  {index + 1}.
                </span>
                <span className="font-medium">
                  {problem.title}
                </span>
              </div>

              {/* Category */}
              <div className="col-span-3 text-base-content/70">
                {problem.category}
              </div>

              {/* Difficulty */}
              <div className="col-span-3 text-right">
                <span className={`badge ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
            </Link>
          ))}

        </div>
      </div>
    </div>
  )
}

export default ProblemsPage