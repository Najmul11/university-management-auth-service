import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import config from './config/index'
import userRoute from './app/modules/user/user.route'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Application routes
app.use('/api/v1/users', userRoute)

// testing
app.get('/', (req: Request, res: Response) => {
  res.send(`Server running on ${config.port}`)
})

export default app
