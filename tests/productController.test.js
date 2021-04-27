const request = require('supertest')

const app = require('../index')

describe('POST /products/new', () => {
    it('Creating new Manager to associate with Container', done => {
        //Create Manager so we can associate a Container to it
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
    it('Creating new Container to associate with Product', done => {
        //Create Container so we can associate a Product to it
        const container = {
            id: 100,
            address: 'calle testing #100',
            width: 20,
            height: 10,
            managerId: 100
        }
        request(app)
            .post('/api/containers/new')
            .send(container)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect('"Container Created"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/products/new responds with 201 Product Created', done => {
        const data = {
            id: 100,
            name: 'Cesta de Frutas',
            category: 'Alimentación',
            price: 10,
            containerId: 100
        }
        request(app)
            .post('/api/products/new')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .expect('"Product Created"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/products/new responds with 400 containerId not exists', done => {
        const data = {
            id: 100,
            name: 'Cesta de Frutas',
            category: 'Alimentación',
            price: 10,
            containerId: 99
        }
        request(app)
            .post('/api/products/new')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"Container ID cannot be null or may not exist"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/products/new responds with 400 on bad request', done => {
        const data = {}
        request(app)
            .post('/api/products/new')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('"Product Not Created"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})

describe('GET /products', () => {
    it('/products responds json with all products in db', done => {
        request(app)
            .get('/api/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})

describe('GET /products/:id', () => {
    it('/products/:id responds json with one single Product with specified id', done => {
        request(app)
            .get('/api/products/100')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })

    it('/products/:id does not find Product with specified id', done => {
        request(app)
            .get('/api/products/99')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Product not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})

describe('PUT /products/:id', () => {
    it('/products/:id responds with 200 Product Updated', done => {
        const data = {
            id: 100,
            firstName: 'Testing',
            lastName: 'UserUpdated',
            email: 'test@testUpdated.com',
            phone: '657894536'
        }
        request(app)
            .put('/api/products/100')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/products/:id responds with 404 on not existing id to update', done => {
        const data = {
            id: 100,
            firstName: 'Testing',
            lastName: 'UserUpdated',
            email: 'test@testUpdated.com',
            phone: '657894536'
        }
        request(app)
            .put('/api/products/50')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Product not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('/products/:id responds with 200 on empty request, but dont update', done => {
        const data = {}
        request(app)
            .put('/api/products/100')
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

describe('DELETE /products/:id', () => {
    it('/products/:id responds with 200 Product Deleted', done => {
        request(app)
            .delete('/api/products/100')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect('"Product Deleted"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
    it('Delete the Container', done => {
        //Now we can Delete the Container
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
    it('/products/:id responds with 404 on not existing id', done => {
        const data = {}
        request(app)
            .delete('/api/products/50')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .expect('"Product not found"')
            .end((err) => {
                if (err) return done(err);
                done();
            })
    })
})