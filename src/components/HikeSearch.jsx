import React from "react";


function Search({search, setSearch, handleSearch, handleSubmit}) {
    return (
        <div className="search">
            <label>Search by Name</label>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={search}
                    placeholder="Type a hike name"
                    onChange={(event) => handleSearch(event.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}


export default Search;