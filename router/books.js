const router = require('express').Router()

let books = require('../books')

const API_KEY = "DeepThought intern assignment 1"

router.get('/', (req, res) => res.json(books))

router.get('/:id', (req, res) => res.json(books.find(book => +book.id === +req.params.id)))

router.post('/', (req, res) => {
    if (req.headers.authorization.split('Bearer ')[1] === 'admin') {
        books.push(req.body)
        res.json({ message: "Added successfully", books })
    }
    res.json({ message: "Request denied" })
})

router.put('/:id', (req, res) => {
    if (req.headers.authorization.split('Bearer ')[1] === 'admin') {
        books = books.filter(book => +book.id !== +req.params.id)
        books.push({ id: req.params.id, name: req.body.name })
        res.json({ message: "Updated successfully", books })
    }
    res.json({ message: "Request denied" })
})

router.delete('/:id', (req, res) => {
    if (req.headers.authorization.split('Bearer ')[1] === 'admin') res.json(books.filter(book => +book.id !== +req.params.id ))
    res.json({ message: "Request denied" })
})

module.exports = router