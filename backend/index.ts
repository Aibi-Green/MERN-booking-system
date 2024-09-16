import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'

import UserRouter from './src/routes/UserRoutes'
import AdminRouter from './src/routes/AdminRoutes'
import BookingRouter from './src/routes/BookingRoutes'
import RtypeRouter from './src/routes/RtypeRoutes'
import RequirementRouter from './src/routes/RequirementRoutes'
import RbookingRouter from './src/routes/RbookingRoutes'

// initializes express application
const app = express()

// cors headers
const corsOptions = {
    // tells browser to only accept requests from this url
    origin: 'http://localhost:5173',

    // attached to a preflight response of OPTIONS request telling browser 
    // what methods are accepted by this server
    methods: "POST, PUT, DELETE", 

    // preflight reponses have only 1 day max of being cached in the browser
    maxAge: 86400
}

// sets the CORS headers
app.use(cors(corsOptions))

// for processing urlencoded forms
// ⚠️uses body-parser which is deprecated causing an error
app.use(express.urlencoded()) 
// for converting all requests' body to json format
app.use(express.json()) 

// Routers
app.use('/users', UserRouter)
app.use('/admins', AdminRouter)
app.use('/bookings', BookingRouter)
app.use('/rbookings', RbookingRouter)
app.use('/rtypes', RtypeRouter)
app.use('/requirements', RequirementRouter)

// Connect to mongodb
try {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
    console.log('Connected successfully to database!');
} catch(error) {
    console.log("Failed to connect to MongoDB database...", error);
}

// HOME
app.get("/", async (req: Request, res: Response)=> {
	res.json({message: "Backend working!"});
});

// Starts server
app.listen(process.env.BACKEND_PORT, () => {
    console.log("Server started on http://localhost:8080/\n")
})