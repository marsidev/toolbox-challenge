import { useState } from 'react'
import './App.css'

function App () {
  const [loading, setLoading] = useState('')
  const [data, setData] = useState('')

  const fetchData = async () => {
    setLoading(true)
    fetch('/api/files/data')
      .then(r => r.json())
      .then(setData)
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }

  return (
    <div className='App'>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={fetchData}>
          Fetch API data
        </button>

        {loading && <span>Loading...</span>}

        {data && (
          <code>{JSON.stringify(data)}</code>
        )}
      </div>
    </div>
  )
}

export default App
