import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose'
import expressLayouts from 'express-ejs-layouts'
import 'dotenv/config'
import databaseConnexion from './tools/databaseConnexion'
import User from './routes/user'
import Slider from './routes/slider'
import Room from './routes/room'
import Review from './routes/review'
import Message from './routes/message'
import Menu from './routes/menu'
import Contact from './routes/contact'
import Blog from './routes/blog'

import bodyParser from 'body-parser'
const app = express()
const port = process.env.PORT

//connect to mongodb database
databaseConnexion()

//enable ejs
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

//enable middleware
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
//app.use(expressLayouts)

//Bdd
app.use('/',User)
app.use('/',Slider)
app.use('/',Room)
app.use('/',Review)
app.use('/',Message)
app.use('/',Menu)
app.use('/',Contact)
app.use('/',Blog)

//enable routes
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})