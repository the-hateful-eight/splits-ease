const router = require('express').Router()
const paypal = require('paypal-rest-sdk')
paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET,
    openid_client_id: process.env.PAYPAL_CLIENT_ID,
    openid_secret: process.env.PAYPAL_CLIENT_SECRET,
    openid_redirect_uri: 'http://192.168.1.3:1337/paypal'    
    // openid_redirect_uri: 'http://localhost:1337/paypal'
})


// const scope = ['ACCESS_BASIC_PERSONAL_DATA', 'INVOICING']

// console.log(paypal.openid_connect.authorizeUrl({scope: 'openid https://uri.paypal.com/services/invoicing email'}))
// console.log(paypal.openid_connect)
// paypal.openid_connect.tokeninfo.create('C21AAG89q8ynchlmzRdnLScYbow_rykM4pxGLWutmmcQPoQ8_9h__hhi7_nV5PqgYQde_XVjZn8hNKd2B2HrqMk2HO_iseHHA', (err, token) => {
//     console.log(token)
// })

// paypal.openIdConnect.tokeninfo.refresh('R23AAHnsWu1rboG8HJ6oGPFyF4JvJJB-3kiVVzQejm6Vvg9O7aXB7uo3NnWx7mezQofoztJpQNShPhZYZClldeYqAlEZNGYyocpXG-rDmjO4dCWEIPMdfFD1caHRHhRAz4_sBQIBXSCqPQ5jNSXzQ', function (error, tokeninfo) {
//     if (error) {
//         console.log(error);
//     } else {
//         paypal.openIdConnect.userinfo.get(tokeninfo.access_token, function (error, userinfo) {
//             console.log(userinfo)
//         })
//     }})

router.get('/', async (req, res, next) => {
    try {
        const url = paypal.openid_connect.authorizeUrl({scope: 'openid https://uri.paypal.com/services/invoicing email'})
        res.json(url)
    } catch (err) {
        next(err)
    }
})

router.get('/test', async (req, res, next) => {
    const token = req.query.code
    paypal.openid_connect.tokeninfo.create(token, (err, usertoken) => {
        if (err) next(err)
        res.json(usertoken)
    })
})

module.exports = router
