import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comment.js"
import usersRouter from './routes/users.js';
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001


app.use(cors({ 
  origin: ['http://localhost:5173', 'https://indi-project-orcin.vercel.app'], 
  credentials: true 
}))
app.use(express.json())


app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)

app.use('/api/users', usersRouter);
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
