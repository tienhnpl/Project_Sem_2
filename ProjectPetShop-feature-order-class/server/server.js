const express = require('express')
require('dotenv').config()
const dbconnect = require('./config/dbconnect')
const initRoutes = require('./routes')
const cookieParser = require('cookie-parser')
const cors = require('cors')



const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())
const port = process.env.PORT || 8888
app.use(express.json())
app.use(express.urlencoded({extended: true}))
dbconnect()
initRoutes(app)

app.use('/', (req, res) => { res.send('SEVER ONNN')})

app.listen(port, () => {
    console.log('Sever running on the port: ' + port);
})