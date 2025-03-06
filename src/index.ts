import path from 'node:path'

import express from 'express'
import mongoose from 'mongoose'

import { router } from './router'

mongoose
  .connect('mongodb://localhost:27017')
  .then(() => {
    const app = express()

    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header('Access-Control-Allow-Methods', '*')
      res.header('Access-Control-Allow-Headers', '*')
      next()
    })
    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads')),
    )
    app.use(express.json())
    app.use(router)

    app.listen(3001, () => {
      console.log('Server is running on http://localhost:3001')
    })

    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.error('Error: ', error)
  })
