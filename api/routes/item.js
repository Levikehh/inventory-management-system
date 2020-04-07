const router = require('express').Router()
const request = require('request')
const http = require('http')
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
        let data = ''
        http.get('http://localhost:3000/inventory/all', (resp) => {
            resp.on('data', (chunk) => {
                data += chunk
            })
            
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                data = JSON.parse(data)
                request.post('http://localhost:3000/inventory/add', {
                    json: {
                        ID: req.body.ID,
                        barCode: `ID ${data.length}`,
                        Stock: 0,
                    }
                    }, (error, res, body) => {
                    if (error) {
                        console.error(error)
                        return
                    }
                    console.log(`statusCode: ${res.statusCode}`)
                    console.log(body)
                })
                return res.status(200).send(savedItem)
            })
        })
        
    } catch (err) {
        console.log(`Can't create the item in Items with id "${req.body.ID}" at the moment`)
        res.status(400).send(err)
    }
})

module.exports = router