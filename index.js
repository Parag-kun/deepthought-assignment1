const express = require('express')
const books = require('./router/books.js')

const app = express()
const port = process.env.PORT || 4000 

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/books', books)

app.listen(port, err => err ? console.log(err) : console.log('Server running at http://localhost:' + port))