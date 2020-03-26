const router = require('express').Router()
const Item = require('../models/item')

router.post('/add', async (req, res) => {
    console.log(`Creating new item in Items with ID: ${req.body.ID}`)
    var item = new Item({
        ID: req.body.ID,
        Title: req.body.Title,
        Description:req.body.Description,
        Category: req.body.Category,
        subCategory: req.body.subCategory,
        Price: req.body.Price,
        releaseDate: req.body.releaseDate,
        newTillDate: req.body.newTillDate,
        isPublic: req.body.isPublic,
    });
    try {
        const savedItem = await item.save()
        console.log(`Item ${req.body.ID} is created in Items`)
        res.status(200).send(savedItem)
    } catch (err) {
        console.log(`Can't create the item in Items with id "${req.body.ID}" at the moment`)
        res.status(400).send(err)
    }
})

module.exports = router