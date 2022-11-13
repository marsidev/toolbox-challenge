import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'
import { csvToJson } from './helpers/csv-to-json.js'
import notFoundHandler from './middlewares/notFound.js'
const app = express()

const API_URL = 'https://echo-serv.tbxnet.com/v1'
const fetchOptions = {
  headers: {
    authorization: 'Bearer aSuperSecretKey'
  },
  method: 'GET'
}

// Endpoints
app.get('/api/files/data', async (_req, res) => {
  try {
    // fetch all the filenames
    const filesRes = await fetch(`${API_URL}/secret/files`, fetchOptions)
    if (!filesRes.ok) return res.status(500).json({ error: 'Something went wrong' })
    const { files } = await filesRes.json()

    // fetch all files data with `Promise.all`
    const promises = files.map(fileName => fetch(`${API_URL}/secret/file/${fileName}`, fetchOptions))
    const responses = await Promise.all(promises)
    const filesRawData = await Promise.all(responses.map(r => r.text()))

    const filesContent = []
    filesRawData.forEach((rawData, fileIndex) => {
      // the raw data can be an stringified json with an error object, we can detect if the string contains the error codes
      if (!rawData.includes('SYS-ERR') && !rawData.includes('API-500')) {
        // format the csv to json
        const fileName = files[fileIndex]
        const jsonFileData = csvToJson(fileName, rawData)

        // check if the lines array is not empty
        if (jsonFileData.lines.length > 0) {
          filesContent.push(jsonFileData)
        }
      }
    })

    res.status(200).json(filesContent)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

// Middlewares
app.use(cors('*'))
app.use(function (_req, res) {
  res.set('Cache-control', 'public, max-age=10')
})

// Error handlers
app.use(notFoundHandler)

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app
