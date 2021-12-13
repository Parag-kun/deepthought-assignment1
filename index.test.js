const request = require('supertest')
const index = require('./index.js')

describe('Books API', () => {
    it('GET /api/books', () => {
        return request(index)
            .get('/api/books')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        })
                    ])
                )
            })
    })

    it('GET /api/books/id', () => {
        return request(index)
            .get('/api/books/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: 1,
                        name: 'Book1'
                    })
                )
            })
    })

    it('GET /api/books/83706', () => {
        return request(index)
            .get('/api/books/83786')
            .expect(404)
    })

    it('POST /api/books', () => {
        return request(index)
            .post('/api/books')
            .send({ name: 'Book4' })
            .set({'Authorization': 'Bearer admin'})
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: 4,
                        name: 'Book4'
                    })
                )
            })
    })

    it('PUT /api/books/2', () => {
        return request(index)
            .put('/api/books/2')
            .send({ name: 'BOOK2' })
            .set({'Authorization': 'Bearer admin'})
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.objectContaining({
                        id: 2,
                        name: 'BOOK2'
                    })
                )
            })
    })

    it('DELETE /api/books/3', () => {
        return request(index)
            .delete('/api/books/3')
            .set({'Authorization': 'Bearer admin'})
            .expect('Content-Type', /json/)
            .expect(200)
            .then(response => {
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            name: expect.any(String)
                        })
                    ])
                )
            })
    })

})