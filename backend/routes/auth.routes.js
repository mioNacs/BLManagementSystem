import { Router } from "express";
import { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser, deleteAccount, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.post("/register", registerUser);
console.log("Login route defined at /api/auth/login");
router.post("/login", (req, res, next) => {
  console.log("Login request received:", req.body);
  loginUser(req, res, next);
});
router.post("/refresh-token", refreshAccessToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected routes
router.post("/logout", verifyJWT, logoutUser);
router.get("/me", verifyJWT, getCurrentUser);
router.delete("/delete-account", verifyJWT, deleteAccount);

export default router; 