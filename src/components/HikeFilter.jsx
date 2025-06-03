import React from "react";

function DifficultyFilter({handleFilterDifficulty}) {
    return (
        <div className="filter">
            <label>Filter by Difficulty</label>
            <select name="filter" onChange={handleFilterDifficulty}>
                <option value="All">All</option>
                <option value="easy">Easy</option>
                <option value="moderate">Moderate</option>
                <option value="hard">Hard</option>
            </select>
        </div>
    )
}

function CompletedFilter({handleFilterCompleted}) {
    return (
        <div className="filter">
            <label>Filter by Completion</label>
            <select name="filter" onChange={handleFilterCompleted}>
                <option value="All">All</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
            </select>
        </div>
    )
}
export {CompletedFilter, DifficultyFilter}