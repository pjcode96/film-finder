import { useEffect, useState, useRef } from 'react';
import { Movies } from './components/movies'
import useMovies from './hooks/useMovies'
import './App.css'


function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstRender = useRef(true);

  useEffect(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = search === ''
        return
      }

      if (search === '') {
        setError('No se puede buscar una película vacía')
        return
      }

      if ((search.match(/^\d+$/))) {
        setError('No se puede buscar una película con un número')
        return
      }

      setError(null)

    }, [search]
  )

  return { error, search, isFirstRender, setSearch }
}

export function App() {
  const { mappedMovies: movies } = useMovies();
  const { error, search, setSearch
  } = useSearch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const { query } = Object.fromEntries(new window.FormData(event.target))
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    if (newQuery.startsWith(' ')) return
    setSearch(newQuery)
  }

  return (
    <div className='page'>
      <header className='container'>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input onChange={handleChange} value={search} name="search" className='title-filter' placeholder='Avengers, Star Wars, The Matrix...' />
          <button className='form-button' type='submit' >Buscar</button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </header>

      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}