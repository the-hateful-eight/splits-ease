const { expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../')
const User = db.model('user')
const Friend = db.model('friend')

describe('User routes', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('/api/users/', () => {
        const userName = 'codyTest'
        const userEmail = 'codyTest@email.com'
        const userPhone = '1-234-567-8910'
        const userPassword = '123'

        const userName2 = 'Matt "The Contract Killer" Contract'
        const userEmail2 = 'killer@contract.com'
        const userPhone2 = '1-555-567-8910'
        const userPassword2 = 'JesusChristThatsMattConTract'

        beforeEach(() => {
            return User.create({
                name: userName,
                email: userEmail,
                phone: userPhone,
                password: userPassword
            })
        })

        beforeEach(() => {
            return User.findOrCreate({
                name: userName2,
                email: userEmail2,
                phone: userPhone2,
                password: userPassword2
            })
        })

        //login test
        it(`PUT /api/user/login success`, () => {
            return request(app)
                .put(`/api/user/login`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(friendName)
                    expect(res.body[0].email).to.be.equal(friendEmail)
                    expect(res.body[0].phone).to.be.equal(friendPhone)
                    expect(res.body[0].userId).to.be.equal(userId)
                })
        })

        //login test fail
        it(`PUT /api/user/login fail`, () => {
            return request(app)
                .put(`/api/user/login`)
                .expect(401)
        })

        //GET test
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

        //POST test
        it('POST /api/user', () => {
            return request(app)
                .post('/api/user')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(userName2)
                    expect(res.body[0].email).to.be.equal(userEmail2)
                    expect(res.body[0].phone).to.be.equal(userPhone2)
                    expect(res.body[0].password).to.be.equal(userPassword2)
                })
        })

    })
})

describe('Friend routes', () => {
    const friendName = 'codyTest'
    const friendEmail = 'codyTest@email.com'
    const friendPhone = '1-234-567-8910'
    const userId = 1

    //create friend of user/1
    beforeEach(() => {
        return Friend.create({
            name: friendName,
            email:friendEmail,
            phone: friendPhone,
            userId
        })
    })

    //GET test
    it(`GET /api/user/:id/friends`, () => {
        return request(app)
            .get(`/api/user/${userId}/friends`)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body[0].name).to.be.equal(friendName)
                expect(res.body[0].email).to.be.equal(friendEmail)
                expect(res.body[0].phone).to.be.equal(friendPhone)
                expect(res.body[0].userId).to.be.equal(userId)
            })
    })

    //POST test
    it(`POST /api/user/:id/friends`, () => {
        return request(app)
            .post(`/api/user/${userId}/friends`)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body[0].name).to.be.equal(friendName)
                expect(res.body[0].email).to.be.equal(friendEmail)
                expect(res.body[0].phone).to.be.equal(friendPhone)
                expect(res.body[0].userId).to.be.equal(userId)
            })
    })

    //PUT test
    it(`PUT /api/user/:id/friends`, () => {
        return request(app)
            .put(`/api/user/${userId}/friends`)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body[0].name).to.be.equal(friendName)
                expect(res.body[0].email).to.be.equal(friendEmail)
                expect(res.body[0].phone).to.be.equal(friendPhone)
                expect(res.body[0].userId).to.be.equal(userId)
            })
    })

})