
function Movie({ movie }) {
  return (
    <div className="movie">
      <h3 className='movie_title'>{movie?.title}</h3>
      <img className='movie__poster' alt={`Poster from ${movie?.title} movie`} src={movie?.poster} />
      <p>Año: {movie?.year}</p>
    </div>
  )
}

export default Movie