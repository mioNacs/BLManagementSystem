import express from "express";
import cors from "cors"//this is used to allow the request from the other domain
import cookieParser from "cookie-parser";//this is used to read the cookie from the browser
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Configure CORS based on environment
const corsOptions = {
  origin: [
    process.env.CORS_ORIGIN, 
    'http://localhost:5174', 
    'http://localhost:5173', 
    'http://localhost:3000',
    'https://mionacs.github.io'
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Allow-Headers",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers"
  ],
  exposedHeaders: ["set-cookie"],
  maxAge: 86400 // 24 hours in seconds
};

// Add pre-flight response headers
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (corsOptions.origin.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', corsOptions.methods.join(','));
  res.setHeader('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
  next();
});

app.use(cors(corsOptions));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is running' });
});

//this line is a configuration line to tell express that we can accept json data
app.use(express.json({limit :"16kb"}));
// when we get data from url it is in the incoded form this configuration is used for reading the data 
app.use(express.urlencoded({extended:true}));
// this configuration is used for storing some static data in public folder
app.use(express.static("public"))


//this is used to read the cookie form browser 
app.use(cookieParser())

import { userRouter } from "./routes/user.route.js";
app.use("/api/user",  userRouter)//this is used to use the user router for the api/user route

// Routes

app.use("/api/auth", authRoutes);

// event routes
import eventRouter from "./routes/event.routes.js";
app.use("/api/event", eventRouter);

// Direct login route for testing 
app.post('/direct-login', (req, res) => {
  console.log("Direct login hit:", req.body);
  res.status(200).json({ message: 'Direct login route works' });
});

// 404 middleware
app.use((req, res) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

export {app};//this is used to export the app object so that we can use it in other files