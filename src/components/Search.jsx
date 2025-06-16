import React from 'react'
import glass from "../assets/glass.svg";
const Search = ({ searchTerm, setSearchTerm }) => (
  <div className="full">
    <div className="search">
      <img src={glass} alt="search"/>
      <input
        type="text"
        placeholder="Search through thousands of movies"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-[#23232b] py-3 pl-12 pr-4 rounded-xl text-base text-gray-200 placeholder-gray-400 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>
  </div>
)

export default Search