const express = require('express')
const cors = require('cors')

const app = express()

// Config JSON response
app.use(express.json())

// Solve CORS 
app.use(cors({credentials: true, origin: 'https://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

app.listen(4000)