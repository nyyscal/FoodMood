import express from "express"
import "dotenv/config"
import userRoutes from "../src/routes/userRoutes.js"
import { clerkMiddleware } from '@clerk/express'

const app = express()
app.use(clerkMiddleware())

const PORT = process.env.PORT || 3000

app.get("/",(_,res)=>{
  res.send("Server is working fine!")
})

app.use("/users",userRoutes)

app.listen(PORT,()=>{
  console.log(`Server is running at http://localhost:${PORT}`)
})