const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const cors = require ('cors')
require('dotenv').config()

const app = express()
const PORT = 3004

//Declared DB Variables
let db,
  dbConnectionStr = process.env.DB_STRING,
  dbName = 'breaking-bad-quotes'



//Connect to Mongo
MongoClient.connect(dbConnectionStr)
  .then(client => {
    console.log(`Connected to ${dbName} Database broski`)
    db = client.db(dbName)
  })


//Set Middleware
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//CRUD Methods
//READ

app.get('/', (req,res) => {
  db.collection('quotes').find().toArray()
    .then(data => {
      let nameList = data.map( item => item.author)
      console.log(nameList)
      res.render('index.ejs', {quotes: nameList}) //might change this
    })
    .catch(error => console.log(error))
})

//CREATE
app.post('/quotes', (req,res) =>{
  console.log('Post HEARD')
  db.collection('quotes').insertOne(req.body)
  .then(result =>{
    console.log(result)
    res.redirect('/')
  }) 
})


//UPDATE
app.put('/updateEntry', (req, res)=> {
  console.log(req.body)
  db.collection('quotes').findOneAndUpdate(
    {author: req.body.author},
    {
      $set: {
        author: req.body.author,
        quote: req.body.quote
      }
    },
    {
      upsert: true
    }
  )
  .then(result => {
    console.log(result)
    res.json('suckcess!')
  })
  .catch(error => console.log(error))
 
})

//DELETE? Nah

app.listen(process.env.PORT || PORT , ()=> {
  console.log("Dat Server is Running")
} )