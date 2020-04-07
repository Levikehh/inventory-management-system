const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    ID: {type: String},
    barCode: {type: String},
    Stock: {type: Number},
    Ordered: {type: Number}
})

module.exports = mongoose.model('Inventory', inventorySchema, 'inventory')