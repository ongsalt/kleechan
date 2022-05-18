const express = require('express')
const app = express()

const run = (callback) => {
    app.use(express.json());
    app.use('/', express.static('web'))
    app.all('/api', (req, res) => {
        console.log(req.body)
        callback(req.body)
    })
    app.listen(80)
}

run(console.log)

module.exports = run