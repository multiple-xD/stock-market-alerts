const express = require('express')
const path = require('path')
const scraper = require("./scraper.js");

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.dirname__+"public/index.html")
})
app.get('/json', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let quotes = scraper.get_quotes();
    res.send(quotes);
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
