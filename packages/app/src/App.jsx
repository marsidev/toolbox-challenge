import { useState } from 'react'
import './App.css'

const API_BASE_URL = import.meta.env.PROD ? 'https://toolbox-challenge-api.vercel.app/api' : '/api'

function App () {
  const [loading, setLoading] = useState('')
  const [data, setData] = useState('')

  const fetchData = async () => {
    setLoading(true)
    fetch(`${API_BASE_URL}/files/data`)
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
