import fetch from 'node-fetch'
import { Router } from 'express'
import { csvToJson } from '../helpers/csv-to-json.js'
const router = Router()

const API_URL = 'https://echo-serv.tbxnet.com/v1'
const fetchOptions = {
  headers: {
    authorization: 'Bearer aSuperSecretKey'
  },
  method: 'GET'
}

router.get('/', async (req, res) => {
  const { fileName } = req.query

  try {
    // if file name was provided, then there is no need to fetch all files
    if (fileName) {
      const response = await fetch(`${API_URL}/secret/file/${fileName}`, fetchOptions)
      const fileRawData = await response.text()

      // the raw data can be an stringified json with an error object, we can detect if the string contains the error codes
      if (!fileRawData.includes('SYS-ERR') && !fileRawData.includes('API-500')) {
        // format the csv to json
        const jsonFileData = csvToJson(fileName, fileRawData)

        res.set('Cache-Control', 's-max-age=60, max-age=60, public')
        res.status(200).json([jsonFileData])
      } else {
        const error = JSON.parse(fileRawData)
        const status = error.status ?? 500
        const errMessage = error.message ?? 'Something went wrong'
        res.status(status).json({ error: errMessage })
      }
    } else {
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
        if (!rawData.includes('SYS-ERR') && !rawData.includes('API-500')) {
          const fileName = files[fileIndex]
          const jsonFileData = csvToJson(fileName, rawData)

          // check if the lines array is not empty
          if (jsonFileData.lines.length > 0) {
            filesContent.push(jsonFileData)
          }
        }
      })

      res.set('Cache-Control', 's-max-age=60, max-age=60, public')
      res.status(200).json(filesContent)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Something went wrong' })
  }
})

export default router
