import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import { app } from "./app.js";

// Load environment variables from .env file
dotenv.config();

// Log all routes for debugging
console.log("Starting server with routes:");
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(`Route: ${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
  }
});

connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
}).catch((error) => {
    console.error("Failed to connect to the database", error);
});