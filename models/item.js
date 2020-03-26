const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    ID: {type: String},
    Title: {type: String},
    Description: {type: String},
    Category: {type: String},
    subCategory: {type: String},
    Price: {type: Number},
    releaseDate: {type: Date},
    newTillDate: {type: Date},
    isPublic: {type: Boolean},
})

module.exports = mongoose.model('Item', itemSchema, 'items')