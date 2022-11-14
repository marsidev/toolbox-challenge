import { useEffect, useState, useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import { useDebounce } from '../hooks/use-debounce'
import { formatFilesData } from '../utils/format-files'
import { getFilesData } from '../services/api'
import { Table } from './Table'
import { Input } from './Input'
import { Navbar } from './Navbar'

function App () {
  const [loading, setLoading] = useState(true)
  const [filesData, setFilesData] = useState(null)
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)

  const allFileLines = useMemo(() => filesData && formatFilesData(filesData), [filesData])

  useEffect(() => {
    setLoading(true)
    getFilesData(debouncedQuery)
      .then(data => {
        if (Array.isArray(data)) setFilesData(data)
        else setFilesData([])
      })
      .then(() => setLoading(false))
  }, [debouncedQuery])

  return (
    <>
      <Navbar />

      <Container as='main' className='max-w-1200'>
        <Input onChange={event => setQuery(event.target.value)} />

        {loading && <span>Loading...</span>}

        {!loading && allFileLines?.length === 0 && (
          <span>No files found.</span>
        )}

        {!loading && allFileLines?.length > 0 && (
          <Table filesData={allFileLines} />
        )}

      </Container>
    </>
  )
}

export default App
