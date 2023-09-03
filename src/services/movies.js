export const searchMovies = async (search) => {
  if (search === '') return null

  try {
    const response = await fetch(`${import.meta.env.VITE_MOVIE_API_URL}s=${search}`)
    const moviesJson = await response.json()

    const movies = moviesJson.Search

    return movies?.map(
      (movie) => {
        return {
          title: movie?.Title,
          year: movie?.Year,
          imdbID: movie?.imdbID,
          poster: movie?.Poster
        }
      }
    )

  } catch (error) {
    throw new Error('Error while searching movies')
  }
}