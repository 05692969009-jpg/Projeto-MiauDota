import express from 'express'
import { db } from '../database/knex.js'
const app = express()
const port = 3000
app.use(express.json())

