import 'dotenv/config'
import { setCharacters } from './database'

const express = require('express')
const app = express()
const port = 3000


app.get('/', async (req, res) => {
  res.send(await setCharacters())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  fetch 
})

