const router = require('express').Router()

let books = require('../books')

const API_KEY = "DeepThought intern assignment 1"

router.get('/', (req, res) => res.json(books))

router.get('/:id', (req, res) => {
    let book = books.find(book => +book.id === +req.params.id)
    if (book) res.json(book)
    res.status(404).json({ message: "Not found" })
})

router.post('/', (req, res) => {
    if (req.headers.authorization.split('Bearer ')[1] === 'admin') {
        books.push({ id: books.length + 1, name: req.body.name })
        res.json({ id: books.length, name: req.body.name })
    }
    res.json({ message: "Request denied" })
})

router.put('/:id', (req, res) => {
    if (req.headers.authorization.split('Bearer ')[1] === 'admin') {
        books = books.filter(book => +book.id !== +req.params.id)
        books.push({ id: +req.params.id, name: req.body.name })
        res.json({ id: +req.params.id, name: req.body.name })
    }
    res.json({ message: "Request denied" })
})

router.delete('/:id', (req, res) => {
    if (req.headers.authorization.split('Bearer ')[1] === 'admin') res.json(books.filter(book => +book.id !== +req.params.id ))
    res.json({ message: "Request denied" })
})

module.exports = router