const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const testRouter = require('./routes/test')
const marketsRouter = require('./routes/markets')
const authRouter = require('./routes/auth')

require("./database")

const app = express()
const PORT = 8080


app.use(cookieParser())
app.use(express.json())
app.use(session({
    secret: 'ASDFADSSDFGFDSGFDGDFGDG',
    resave: false,
    saveUninitialized: false
}))
app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`)
    next()
})




app.use('/api/test', testRouter)
app.use('/api/markets', marketsRouter)
app.use('/api/auth', authRouter)
app.listen(PORT, () => {console.log(`Running server in port ${PORT}`)})

