const express = require('express')
const dotenv = require('dotenv/config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const log = require('log-to-file')
const path = require('path')

const app = express()
const port = process.env.APPPORT;

const dashboardRoute = require('./routes/dashboard')
const statsRoute = require('./routes/statistics')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "pug")
app.set('views', path.join(__dirname, '/views'))

app.use('/', dashboardRoute)
app.use('/home', dashboardRoute)
app.use('/dashboard', dashboardRoute)

app.use('/stats', statsRoute)

mongoose.connect(process.env.DATABASE_PRODUCTION, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) console.log(err)
    app.listen(port, () => console.log(`\n+----------------------------------------+\n` +
    `|                                        |\n` +
    `|   NoMindz Inventory Management System  |\n` +
    `|         Listening on port ${port}         |\n` +
    `|                                        |\n` +
    `+----------------------------------------+\n`))
})