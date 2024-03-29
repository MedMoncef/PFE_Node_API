import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
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
import Reservation from './routes/reservation'
import Post from './routes/post'
import testimony from './routes/testimony'
import roomType from './routes/roomtype'
import payment from './routes/payment'
import menutype from './routes/menutype'
import timetable from './routes/timetable'
import announcement from './routes/announcement'


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
app.use('/',announcement)
app.use('/',Room)
app.use('/',Review)
app.use('/',Message)
app.use('/',Menu)
app.use('/',Contact)
app.use('/',Blog)
app.use('/',Reservation)
app.use('/',Post)
app.use('/',testimony)
app.use('/',roomType)
app.use('/',payment)
app.use('/',menutype)
app.use('/',timetable)

//enable routes
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})