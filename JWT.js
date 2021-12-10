require('dotenv').config()

const jtw = require('jsonwebtoken')

const createTokens = (user) => {
    const accessToken = jtw.sign({ username: user.username, id: user.id }, process.env.ACCESS_TOKEN_SECRET)
    return accessToken
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]

    if (!accessToken) return res.status(400).json({ error: "User not Authenticated" })

    try {
        const validToken = jtw.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

        if (validToken) {
            req.authenticated = true
            return next()
        }
    } catch (err) {
        return res.status(400).json({ error: err })
    }
}

module.exports = { createTokens, validateToken }