import { useEffect, useState, useRef, useCallback } from 'react';
import { Movies } from './components/movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it';
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
  const [sort, setSort] = useState(false);
  const { error, search, setSearch } = useSearch()
  const { movies, getMovies, loading } = useMovies({ search, sort });

  const debouncedGetMovies = useCallback(
    debounce(search => {
      console.log('search', search)
      getMovies({ search })
    }, 500), []
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    return getMovies({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(' ')) return
    setSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  const handleSort = () => {
    setSort(!sort)
  }
  return (
    <div className='page'>
      <header className='container'>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input onChange={handleChange} value={search} name="search" className='title-filter' placeholder='Avengers, Star Wars, The Matrix...' />

          <div className="sort-filter__content">
            <label htmlFor='sort_filter'>Ordenar alfabeticamente</label>
            <input id="sort_filter" onChange={handleSort} type='checkbox' checked={sort} className='sort-filter' />
          </div>
          <button className='form-button' type='submit' >Buscar</button>
        </form>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      </header>

      <main>
        {
          loading
            ? <h3>CARGANDO...</h3>
            : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}