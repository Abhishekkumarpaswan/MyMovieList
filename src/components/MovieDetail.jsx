import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
const API_KEY = 'af0c7b8c'
const API_BASE_URL = 'https://www.omdbapi.com/'

const MovieDetail = () => {
  const { imdbID } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`)
        const data = await res.json()
        if (data.Response === 'False') {
          setError(data.Error)
          setMovie(null)
        } else {
          setMovie(data)
        }
      } catch {
        setError('Failed to fetch movie details.')
        setMovie(null)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [imdbID])

  if (loading) return <div className="wrapper"><p className="text-white">Loading...</p></div>
  if (error) return <div className="wrapper"><p className="text-red-500">{error}</p></div>
  if (!movie) return null

  return (
    <div className="wrapper">
      <Link to="/" className="text-indigo-400 underline mb-4 inline-block">&larr; Back</Link>
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/no-movie.jpeg'}
          alt={movie.Title}
          className="rounded-lg object-cover w-[240px] h-[360px] border border-gray-700"
        />
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">{movie.Title}</h2>
          <p className="text-gray-300 mb-2">{movie.Year} • {movie.Genre} • {movie.Runtime}</p>
          <p className="text-gray-400 mb-4">{movie.Plot}</p>
          <p className="text-white mb-2"><strong>Director:</strong> {movie.Director}</p>
          <p className="text-white mb-2"><strong>Actors:</strong> {movie.Actors}</p>
          <p className="text-white mb-2"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p className="text-white mb-2"><strong>Awards:</strong> {movie.Awards}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail