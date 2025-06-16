import React from 'react'

const MovieCard = ({ movie }) => {
  const { Title, Year, Poster, Type, Plot } = movie
  const posterUrl = Poster && Poster !== 'N/A' ? Poster : '/no-movie.jpeg'
  return (
    <div className="card flex flex-col h-full">
      <img
        src={posterUrl}
        alt={Title}
        className="w-full h-[270px] object-cover rounded-t-lg"
      />
      <div className="p-3 flex flex-col flex-1">
        <h3 className="card-title">{Title}</h3>
        <div className="card-meta">
          <span className="card-year">{Year}</span>
          <span>•</span>
          <span className="card-type">{Type}</span>
        </div>
        <p className="card-plot text-gray-300 text-xs mt-2 line-clamp-3">{Plot}</p>
      </div>
    </div>
  )
}
export default MovieCard