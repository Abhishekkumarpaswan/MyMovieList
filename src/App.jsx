import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Search from './components/Search.jsx'
import Spinner from './components/spinner.jsx'
import MovieCard from './components/MovieCard.jsx'
import MovieDetail from './components/MovieDetail.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

const API_KEY = 'af0c7b8c'
const API_BASE_URL = 'https://www.omdbapi.com/'

const TOP_MOVIE_IDS = [
  'tt0111161', 'tt0068646', 'tt0071562', 'tt0468569', 'tt0050083'
]

const GENRES = [
  { label: 'Action', keyword: 'action' },
  { label: 'Comedy', keyword: 'comedy' },
  { label: 'Drama', keyword: 'drama' },
  { label: 'Romance', keyword: 'romance' },
  { label: 'Horror', keyword: 'horror' },
  { label: 'Sci-Fi', keyword: 'sci-fi' },
  { label: 'Animation', keyword: 'animation' },
  { label: 'Crime', keyword: 'crime' },
  { label: 'Adventure', keyword: 'adventure' },
  { label: 'Fantasy', keyword: 'fantasy' },
  { label: 'Mystery', keyword: 'mystery' },
  { label: 'Thriller', keyword: 'thriller' },
  { label: 'Family', keyword: 'family' },
  { label: 'War', keyword: 'war' },
  { label: 'Western', keyword: 'western' },
]

const MOVIES_PER_PAGE = 14

const TopRow = ({ movies, onMovieClick }) => (
  <section className="top-row mb-10">
    <h2 className="top-h">Top 5 Movies</h2>
    <div className="top">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="top-card w-[200px] bg-[#18181c] rounded-xl shadow-lg cursor-pointer group transition-transform hover:scale-105 border border-gray-800"
          onClick={() => onMovieClick(movie.imdbID)}
        >
          <img
            src={movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/no-movie.jpeg'}
            alt={movie.Title}
            className="rounded-t-xl object-cover w-full h-[300px] border-b border-gray-800"
          />
          <div className="p-3">
            <div className="text-white text-base font-semibold line-clamp-2 text-center">{movie.Title}</div>
            <div className="text-center text-gray-400 text-xs">{movie.Year}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
)

const MovieGrid = ({
  movies,
  isLoading,
  errorMessage,
  onMovieClick,
  title
}) => (
  <section className="movie-section">
    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
    {isLoading ? (
      <Spinner />
    ) : errorMessage ? (
      <p className="text-red-500">{errorMessage}</p>
    ) : (
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.imdbID} onClick={() => onMovieClick(movie.imdbID)} className="cursor-pointer">
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    )}
  </section>
)

const GenreSelect = ({ genre, setGenre }) => (
  <div className="genre-select flex items-center gap-3 mb-8">
    <label htmlFor="genre" className="text-white font-semibold">Genre:</label>
    <select
      id="genre"
      value={genre}
      onChange={e => setGenre(e.target.value)}
      className="genre-dropdown bg-[#23232b] text-white px-4 py-2 rounded-xl border border-gray-700 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
    >
      {GENRES.map(g => (
        <option key={g.keyword} value={g.keyword}>{g.label}</option>
      ))}
    </select>
  </div>
)

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [topMovies, setTopMovies] = useState([])
  const [genre, setGenre] = useState(GENRES[0].keyword)
  const [genreMovies, setGenreMovies] = useState([])
  const [genreErrorMessage, setGenreErrorMessage] = useState('')
  const [genreIsLoading, setGenreIsLoading] = useState(false)
  const [genrePage, setGenrePage] = useState(1)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)
    return () => clearTimeout(handler)
  }, [searchTerm])

  useEffect(() => {
    const fetchTopMovies = async () => {
      setGenreIsLoading(true)
      try {
        const promises = TOP_MOVIE_IDS.map(id =>
          fetch(`${API_BASE_URL}?apikey=${API_KEY}&i=${id}`).then(res => res.json())
        )
        const movies = await Promise.all(promises)
        setTopMovies(movies)
      } catch {
        setTopMovies([])
      } finally {
        setGenreIsLoading(false)
      }
    }
    fetchTopMovies()
  }, [])

  useEffect(() => {
    if (debouncedSearchTerm.trim()) return
    const fetchGenreMovies = async () => {
      setGenreIsLoading(true)
      setGenreErrorMessage('')
      try {
        const url = `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(genre)}&type=movie&page=${genrePage}`
        const response = await fetch(url)
        const data = await response.json()
        if (data.Response === 'False') {
          setGenreErrorMessage(data.Error || 'No movies found')
          setGenreMovies([])
          return
        }
        const moviesWithPlot = await Promise.all(
          (data.Search || []).slice(0, MOVIES_PER_PAGE).map(async (m) => {
            const res = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&i=${m.imdbID}&plot=short`)
            const full = await res.json()
            return { ...m, Plot: full.Plot }
          })
        )
        setGenreMovies(moviesWithPlot)
      } catch {
        setGenreErrorMessage('Error fetching movies. Please try again later.')
        setGenreMovies([])
      } finally {
        setGenreIsLoading(false)
      }
    }
    fetchGenreMovies()
  }, [debouncedSearchTerm, genre, genrePage])

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setSearchResults([])
      setErrorMessage('')
      return
    }
    const fetchMovies = async () => {
      setIsLoading(true)
      setErrorMessage('')
      try {
        const url = `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(debouncedSearchTerm)}&type=movie&page=1`
        const response = await fetch(url)
        const data = await response.json()
        if (data.Response === 'False') {
          setErrorMessage(data.Error || 'No movies found')
          setSearchResults([])
          return
        }
        const moviesWithPlot = await Promise.all(
          (data.Search || []).map(async (m) => {
            const res = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&i=${m.imdbID}&plot=short`)
            const full = await res.json()
            return { ...m, Plot: full.Plot }
          })
        )
        setSearchResults(moviesWithPlot)
      } catch {
        setErrorMessage('Error fetching movies. Please try again later.')
        setSearchResults([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchMovies()
  }, [debouncedSearchTerm])

  const handleMovieClick = (imdbID) => {
    navigate(`/movie/${imdbID}`)
  }

  return (
    <div className="main-wrapper">
      <header>
        <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>
      <TopRow movies={topMovies} onMovieClick={handleMovieClick} />
      {!debouncedSearchTerm.trim() && (
        <GenreSelect genre={genre} setGenre={g => { setGenre(g); setGenrePage(1); }} />
      )}
      {debouncedSearchTerm.trim() ? (
        <MovieGrid
          movies={searchResults}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onMovieClick={handleMovieClick}
          title="Search Results"
        />
      ) : (
        <>
          <MovieGrid
            movies={genreMovies}
            isLoading={genreIsLoading}
            errorMessage={genreErrorMessage}
            onMovieClick={handleMovieClick}
            title={`Browse ${GENRES.find(g => g.keyword === genre)?.label || ''} Movies`}
          />
          <div className="nav-btns flex justify-center gap-4 mt-8">
            <button
              className="nav-btn px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
              onClick={() => setGenrePage((p) => Math.max(1, p - 1))}
              disabled={genrePage === 1}
            >
              &#8592; Previous
            </button>
            <span className="text-white self-center font-medium">Page {genrePage}</span>
            <button
              className="nav-btn px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
              onClick={() => setGenrePage((p) => p + 1)}
            >
              Next &#8594;
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  )
}

const App = () => (
  <Router>
    <main>
      <Navbar />
      <div className="bg-pattern"/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:imdbID" element={<MovieDetail />} />
      </Routes>
      <Footer />
    </main>
  </Router>
)

export default App