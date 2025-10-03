import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import commentRoutes from "./routes/comment.js"
import usersRouter from './routes/users.js';

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

// CORS Configuration with environment variables
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://indi-project-orcin.vercel.app',
  'https://indi-project-1.onrender.com',
  process.env.FRONTEND_URL
].filter(Boolean) // Remove any undefined values

app.use(cors({ 
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      console.log(`CORS blocked origin: ${origin}`)
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}))

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }))

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))


app.use("/api/auth", authRoutes)
app.use("/api/comments", commentRoutes)

app.use('/api/users', usersRouter);
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
