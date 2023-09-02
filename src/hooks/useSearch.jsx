import { useEffect, useState, useRef } from 'react';

export function useSearch() {
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstRender = useRef(true);

  useEffect(
    () => {
      if (!isFirstRender && search === '') {
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

  return { error, search, setSearch }
}