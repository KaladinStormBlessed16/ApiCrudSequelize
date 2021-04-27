const request = require('supertest')

const app = require('../index')

describe('POST /managers/new', () => {
    it('/managers/new responds with 201 Manager Created', done => {
        const data = {
            id: 100,
            firstName: 'Testing',
            lastName: 'User',
            email: 'test@test.com',
            phone: '657894536'
        }
        request(app)
            .post('/api/managers/new')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect('"Manager Created"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/managers/new responds with 400 on bad request', done => {
        const data = {}
        request(app)
            .post('/api/managers/new')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"Manager Not Created"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})

describe('GET /managers', () => {
    it('/managers responds json with all managers in db', done => {
        request(app)
            .get('/api/managers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})

describe('GET /managers/:id', () => {
    it('/managers/:id responds json with one single manager with specified id', done => {
        request(app)
            .get('/api/managers/100')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('/managers/:id does not find manager with specified id', done => {
        request(app)
            .get('/api/managers/10')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Manager not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})

describe('PUT /managers/:id', () => {
    it('/managers/:id responds with 200 Manager Updated', done => {
        const data = {
            id: 100,
            firstName: 'Testing',
            lastName: 'UserUpdated',
            email: 'test@testUpdated.com',
            phone: '657894536'
        }
        request(app)
            .put('/api/managers/100')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/managers/:id responds with 404 on not existing id to update', done => {
        const data = {
            id: 100,
            firstName: 'Testing',
            lastName: 'UserUpdated',
            email: 'test@testUpdated.com',
            phone: '657894536'
        }
        request(app)
            .put('/api/managers/50')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Manager not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/managers/:id responds with 200 on empty request, but dont update', done => {
        const data = {}
        request(app)
            .put('/api/managers/100')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})

describe('GET /manager-complete/:id', () => {
    it('/manager-complete/:id responds json with one single manager and his associations', done => {
        request(app)
            .get('/api/manager-complete/100')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('/manager-complete/:id does not find manager with specified id', done => {
        request(app)
            .get('/api/managers/99')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Manager not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})

describe('DELETE /managers/:id', () => {
    it('/managers/:id responds with 200 Manager Deleted', done => {
        request(app)
            .delete('/api/managers/100')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect('"Manager Deleted"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/managers/:id responds with 404 on not existing id', done => {
        const data = {}
        request(app)
            .delete('/api/managers/50')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Manager not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})