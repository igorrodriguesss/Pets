const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const app = express()

// Config JSON response
app.use(express.json())

// Solve CORS 
app.use(cors({credentials: true, origin: 'https://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Controller 
const UserController = require('./controllers/UserController')


// Routes
const UserRoutes = require('./routes/UserRoutes')



app.use('/users', UserRoutes)

app.listen(4000)