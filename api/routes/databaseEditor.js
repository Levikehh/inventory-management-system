const router = require('express').Router()

const Item = require('../models/item')

router.get('/', async (req, res) => {
    let updatedItem = await Item.updateMany({}, { $set: { somethingNewProperty: 'somethingNewValue' } });

    return res.status(200).send("Kay")
})

router.get('/rm', async (req,res) => {
    let updatedItem = await Item.updateMany({}, { $unset: { somethingNewProperty: 'somethingNewValue' } });

    return res.status(200).send("Kay rm")
})

module.exports = router