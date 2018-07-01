const { expect } = require('chai')
const db = require('../db')
const User = db.model('user')

const { expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../')
const User = db.model('user')

describe('User routes', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('/api/users/', () => {
        const userName = 'codyTest'
        const userEmail = 'codyTest@email.com'
        const userPhone = '1-234-567-8910'
        const userPassword = '123'

        beforeEach(() => {
            return User.create({
                name: userName,
                email: userEmail,
                phone: userPhone,
                password: userPassword
            })
        })

        it('GET /api/user', () => {
            return request(app)
                .get('/api/user')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(userName)
                    expect(res.body[0].email).to.be.equal(userEmail)
                    expect(res.body[0].phone).to.be.equal(userPhone)
                    expect(res.body[0].password).to.be.equal(userPassword)
                })
        })
    })
})