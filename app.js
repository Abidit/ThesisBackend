const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();
const routuser = require('./routes/userRoute')
const jobroute = require('./routes/jobRoute')
const appliroute = require('./routes/applicationRoute')
const dbs = require('./database/db')
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(routuser)
app.use(jobroute)
app.use(appliroute)
app.use('/images', express.static(__dirname + '/images'))


app.get('/', function(req, res) {
    res.send("Student App")
})
app.listen(3000)