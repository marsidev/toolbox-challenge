import { useEffect, useState, useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { useDebounce } from './hooks/use-debounce'
import { formatFilesData } from './utils/format-files'
import { getFilesData } from './services/api'

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
      <Navbar expand='lg' variant='dark' className='bg-gradient my-navbar'>
        <Container fluid className='max-w-1200'>
          <Navbar.Brand className='brand-text'>React Test App</Navbar.Brand>
        </Container>
      </Navbar>

      <Container as='main' className='max-w-1200'>
        <InputGroup className='mb-3' onChange={event => setQuery(event.target.value)}>
          <InputGroup.Text id='inputGroup-label'>Filter by file name</InputGroup.Text>
          <Form.Control aria-describedby='inputGroup-label' aria-labelledby='inputGroup-label' />
        </InputGroup>

        {loading && <span>Loading...</span>}

        {!loading && allFileLines?.length === 0 && (
          <span>No files found.</span>
        )}

        {!loading && allFileLines?.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>File Name</th>
                <th>Text</th>
                <th>Number</th>
                <th>Hex</th>
              </tr>
            </thead>

            <tbody>
              {allFileLines.map(file => {
                return (
                  <tr key={file.hex}>
                    <td>{file.file}</td>
                    <td>{file.text}</td>
                    <td>{file.number}</td>
                    <td>{file.hex}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        )}

      </Container>
    </>
  )
}

export default App
