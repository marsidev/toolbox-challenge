import express from 'express'
import cors from 'cors'
import notFoundHandler from './middlewares/notFound.js'
import filesRoute from './routes/files.js'
const app = express()

// Middlewares
app.use(cors('*'))

// Endpoints
app.use('/api/files/data', filesRoute)

// Error handlers
app.use(notFoundHandler)

// Start the server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app
