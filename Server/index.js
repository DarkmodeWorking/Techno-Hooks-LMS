import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './database/dbConnect.js'
import userRoute from './routes/user.route.js'
import courseRoute from './routes/course.route.js' 
import mediaRoute from './routes/media.route.js'
import purchaseRoute from './routes/purchase.route.js'
import progressRoute from './routes/progress.route.js'
import path from 'path'

dotenv.config({})

connectDB()

const app = express()

const PORT = process.env.PORT || 3000

const _dirname = path.resolve()  
 
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'https://techno-hooks-lms.onrender.com/',
    // origin: 'http://localhost:5173',
    credentials: true
}))

app.use('/api/v1/media', mediaRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/course', courseRoute)
app.use('/api/v1/purchase', purchaseRoute)
app.use('/api/v1/progress', progressRoute)

app.use(express.static(path.join(_dirname, '/Client/dist')))
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, 'Client', 'dist', 'index.html'))
})

app.listen(PORT, () => {
    console.log(`Server listen at port ${PORT}`)
})