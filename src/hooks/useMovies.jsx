import responseMovies from '/mocks/response.json'

function useMovies() {
  const movies = responseMovies.Search

  const mappedMovies = movies?.map(
    (movie) => {
      return {
        title: movie?.Title,
        year: movie?.Year,
        imdbID: movie?.imdbID,
        poster: movie?.Poster
      }
    }
  )

  return { mappedMovies };
}

export default useMovies