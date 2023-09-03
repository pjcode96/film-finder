import Movie from './Movie'

export function ListOfMovies({ movies }) {
  return (
    <>
      <ul className='movies__grid'>
        {
          movies.map(
            (movie) => {
              return (
                <li key={movie.imdbID}>
                  <Movie
                    movie={movie}
                  />
                </li>
              )
            }
          )
        }
      </ul>
    </>


  )
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    <>
      {
        hasMovies
          ? (
            <ListOfMovies movies={movies} />
          )
          : (<h2 className='movies__not-found'>No se han encontrado películas</h2>)
      }

    </>
  )
}