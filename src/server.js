import 'dotenv/config'
// import dotenv from 'dotenv'
// dotenv.config()
import express from 'express'
import authRoute from './routes/auth.route.js'
import notfound from './middlewares/notfound.js'
import errorMiddleware from './middlewares/error.middleware.js'

const app = express()


app.use(express.json())

// REST api service
app.use('/api/auth', authRoute)

// not founded middleware
app.use(notfound)

// error middleware
app.use( errorMiddleware)


const port = process.env.PORT

app.listen(port, ()=> console.log('Server ready on', port))


