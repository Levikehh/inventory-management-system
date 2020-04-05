const express = require('express')
const dotenv = require('dotenv/config')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const log = require('log-to-file')

const app = express()
const port = process.env.APPPORT;

(function() {
    var old = console.log;
    console.log = function(line){
        let today = new Date().toDateString().split(' ').join('-')
        log(line, `api/logs/${today}.log`)
        old.apply(this, arguments)
    }

})()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => res.send('Hello World!'))

mongoose.connect(process.env.DATABASE_PRODUCTION, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
    if(err) console.log(err)
    app.listen(port, () => console.log(`\n+----------------------------------------+\n` +
    `|                                        |\n` +
    `|   NoMindz Inventory Management System  |\n` +
    `|         Listening on port ${port}         |\n` +
    `|                                        |\n` +
    `+----------------------------------------+\n`))
})