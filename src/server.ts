import 'dotenv/config'
import { getCharacters, setCharacters, deleteCharacters } from './database'

const express = require('express')
const app = express()
const port = 3000
const cors = require("cors")


app.use(cors())


app.get('/getCharacters', async (req, res) => {
  res.send(await getCharacters())
})

app.post('/deleteCharacters/:id', async (req, res) => {
  res.send({message: await deleteCharacters(req.params.id)})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  fetch
  setCharacters()
})

