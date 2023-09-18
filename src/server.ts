import 'dotenv/config'
import { getCharacters, setCharacters, deleteCharacters, addNewCharacters, updateCharacters } from './database'

const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")
const bodyParser = require('body-parser')


app.use(cors())
app.use(bodyParser.json())

app.get('/getCharacters', async (req, res) => {
  res.send(await getCharacters())
})

app.post('/deleteCharacters/:id', async (req, res) => {
  res.send({message: await deleteCharacters(req.params.id)})
})

app.post('/addNewCharacters', async (req, res) => {
  console.log(req.body)
  res.send({message: await addNewCharacters(req.body)})
})

app.post('/updateCharacters', async (req, res) => {
  console.log(req.body)
  res.send({message: await updateCharacters(req.body)})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  setCharacters()
})

