export const API_BASE_URL = import.meta.env.PROD ? 'https://toolbox-challenge-api.vercel.app/api' : '/api'

export const getFilesData = async (query) => {
  const url = query ? `${API_BASE_URL}/files/data?fileName=${query}` : `${API_BASE_URL}/files/data`
  return fetch(url)
    .then(r => r.json())
    .catch(error => console.error(error))
}
