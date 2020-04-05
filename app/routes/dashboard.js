const router = require('express').Router()
const http = require('http')

router.get('/', async (req, res) => {
    let data = ''
    const items = http.get('http://localhost:3000/inventory/all', (resp) => {
        resp.on('data', (chunk) => {
            data += chunk
        })
        
          // The whole response has been received. Print out the result.
        resp.on('end', () => {
            data = JSON.parse(data)
            return res.status(200).render('dashboard', {title: 'Hello', datas: data})
        })
    })
})

module.exports = router