import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import config from './config/index'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send(`Server running on ${config.port}`)
})

export default app
