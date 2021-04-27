const request = require('supertest')

const app = require('../index')

describe('POST /containers/new', () => {
    it('Creating new Manager to associate with Container', done => {
        //Create Manager so we can associate on Container to it
        const manager = {
            id: 100,
            firstName: 'Testing',
            lastName: 'User',
            email: 'test@test.com',
            phone: '657894536'
        }
        request(app)
            .post('/api/managers/new')
            .send(manager)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect('"Manager Created"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/containers/new responds with 201 Container Created', done => {
        const data = {
            id: 100,
            address: 'calle testing #100',
            width: 20,
            height: 10,
            managerId: 100
        }
        request(app)
            .post('/api/containers/new')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect('"Container Created"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/containers/new responds with 400 managerId not exists', done => {
        const data = {
            id: 100,
            address: 'calle testing #100',
            width: 20,
            height: 10,
            managerId: 99
        }
        request(app)
            .post('/api/containers/new')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"Manager ID cannot be null or may not exist"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/containers/new responds with 400 on bad request', done => {
        const data = {}
        request(app)
            .post('/api/containers/new')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"Container Not Created"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})

describe('GET /containers', () => {
    it('/containers responds json with all containers in db', done => {
        request(app)
            .get('/api/containers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})

describe('GET /containers/:id', () => {
    it('/containers/:id responds json with one single Container with specified id', done => {
        request(app)
            .get('/api/containers/100')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('/containers/:id does not find Container with specified id', done => {
        request(app)
            .get('/api/containers/99')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Container not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})

describe('PUT /containers/:id', () => {
    it('/containers/:id responds with 200 Container Updated', done => {
        const data = {
            id: 100,
            firstName: 'Testing',
            lastName: 'UserUpdated',
            email: 'test@testUpdated.com',
            phone: '657894536'
        }
        request(app)
            .put('/api/containers/100')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/containers/:id responds with 404 on not existing id to update', done => {
        const data = {
            id: 100,
            firstName: 'Testing',
            lastName: 'UserUpdated',
            email: 'test@testUpdated.com',
            phone: '657894536'
        }
        request(app)
            .put('/api/containers/50')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Container not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/containers/:id responds with 200 on empty request, but dont update', done => {
        const data = {}
        request(app)
            .put('/api/containers/100')
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

describe('DELETE /containers/:id', () => {
    it('/containers/:id responds with 200 Container Deleted', done => {
        request(app)
            .delete('/api/containers/100')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect('"Container Deleted"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('Delete the Manager', done => {
        //Now we can Delete the Manager
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
    it('/containers/:id responds with 404 on not existing id', done => {
        const data = {}
        request(app)
            .delete('/api/containers/50')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Container not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})