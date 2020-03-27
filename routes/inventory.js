const router = require('express').Router()
const log = require('log-to-file')
const bwipjs = require('bwip-js')
const fs = require('fs')

const Inventory = require('../models/inventory')

let response = {
    "code": "",
    "message": "",
}

router.post('/add', async (req, res) => {
    console.log(`Creating new item in Inventory with ID: ${req.body.ID}`)

    let stock = req.body.Stock == null ? 0 : req.body.Stock
    var inventory = new Inventory({
        ID: req.body.ID,
        barCode: req.body.barCode,
        Stock: stock,
    });
    try {
        const savedInventory = await inventory.save()
        
        bwipjs.toBuffer({
            bcid:        'code128',             // Barcode type
            text:        req.body.barCode,      // Text to encode
            scale:       3,                     // 3x scaling factor
            height:      10,                    // Bar height, in millimeters
            includetext: true,                  // Show human-readable text
            textxalign:  'center',              // Always good to set this
            backgroundcolor: 'ffffff',
            textcolor: '444444',
            barcolor: '444444',
        }, function (err, png) {
            if (err) {
                // `err` may be a string or Error object
            } else {
                fs.writeFile(`barCodes/${req.body.ID}.png`, png, function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("The file was saved!");
                    }
                });
            }
        });
        console.log(`Item ${req.body.ID} is created in Inventory`)
        res.status(200).send(savedInventory)
    } catch (err) {
        console.log(`Can't create the item in Inventory with id "${req.body.ID}" at the moment`)
        res.status(400).send(err)
    }
})

router.get('/lookup/:id', async (req, res) => {
    console.log(`Search for: ${req.params.id}`)
    const item = await Inventory.findOne({ID: req.params.id})
    if(!item) {
        console.log(`${req.params.id} is NOT found`)
        return res.status(400).send('ID is not found')
    }

    console.log(`${req.params.id} is found`)
    return res.status(200).send(item)
})

module.exports = router