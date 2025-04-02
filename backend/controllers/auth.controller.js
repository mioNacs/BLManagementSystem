import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password, gender, semester, branch, rollNo, course, contactNo } = req.body;
    
    // Check for duplicate username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json({ 
        success: false, 
        message: "Username already exists. Please choose a different username." 
      });
    }
    
    // Check for duplicate email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ 
        success: false, 
        message: "Email already exists. Please use a different email address." 
      });
    }
    
    // Check for duplicate roll number if provided
    if (rollNo) {
      const existingRollNo = await User.findOne({ rollNo });
      if (existingRollNo) {
        return res.status(409).json({ 
          success: false, 
          message: "Roll number already exists in our system." 
        });
      }
    }
    
    // Check for duplicate contact number if provided
    if (contactNo) {
      const existingContactNo = await User.findOne({ contactNo });
      if (existingContactNo) {
        return res.status(409).json({ 
          success: false, 
          message: "Contact number already exists in our system." 
        });
      }
    }
    
    // Create new user
    const user = await User.create({
      username,
      email,
      password,
      gender,
      semester,
      branch,
      rollNo,
      course,
      contactNo
    });
    
    // Generate tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    
    // Save refresh token to user
    user.refreshToken = refreshToken;
    await user.save();
    
    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000 // 15 minutes
    });
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    return res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      message: "User registered successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed"
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    console.log("Login request body:", req.body);
    const { email, username, password } = req.body;
    
    if ((!email && !username) || !password) {
      console.log("Missing email/username or password in request");
      return res.status(400).json({
        success: false,
        message: "Email/username and password are required"
      });
    }
    
    // Find user by email or username
    let user;
    if (email) {
      console.log("Finding user with email:", email);
      // Case insensitive email search
      user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    } else if (username) {
      console.log("Finding user with username:", username);
      user = await User.findOne({ username });
    }
    
    if (!user) {
      console.log("User not found with provided credentials");
      return res.status(404).json({
        success: false,
        message: "Invalid username or email"
      });
    }
    
    // Verify password
    console.log("Verifying password for user:", user.username);
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", user.username);
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }
    
    // Generate tokens
    console.log("Generating tokens for user:", user.username);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    
    // Update refresh token
    user.refreshToken = refreshToken;
    await user.save();
    
    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000 // 15 minutes
    });
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    console.log("Login successful for user:", user.username);
    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      message: "Login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Login failed"
    });
  }
};

// Logout user
export const logoutUser = async (req, res) => {
  try {
    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    
    // Update user in database
    const user = await User.findById(req.user.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    
    return res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Logout failed"
    });
  }
};

// Refresh token
export const refreshAccessToken = async (req, res) => {
  try {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if (!incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request"
      });
    }
    
    // Verify refresh token
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    
    // Find user with this refresh token
    const user = await User.findById(decodedToken.id);
    if (!user || user.refreshToken !== incomingRefreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }
    
    // Generate new tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    
    // Update refresh token
    user.refreshToken = refreshToken;
    await user.save();
    
    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 15 * 60 * 1000
    });
    
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    return res.status(200).json({
      success: true,
      accessToken
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token"
    });
  }
};

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -refreshToken");
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    return res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch user"
    });
  }
};

// Delete user account
export const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Find and delete the user
    const deletedUser = await User.findByIdAndDelete(userId);
    
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    
    return res.status(200).json({
      success: true,
      message: "Account deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete account"
    });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }
    
    // Check if user exists - case insensitive email search
    const user = await User.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Email address not found in our system"
      });
    }
    
    // Generate a reset token (normally we would save this to the user record)
    const resetToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    
    // In a real implementation, we would send an email here
    console.log(`Reset token for ${user.email}: ${resetToken}`);
    console.log(`Reset URL would be: ${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`);
    
    // For dev purposes, we'll just log the message
    console.log(`Password reset requested for ${email}. In a production environment, an email would be sent with reset instructions.`);
    
    return res.status(200).json({
      success: true,
      message: "Password reset instructions sent to your email"
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process password reset request"
    });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required"
      });
    }
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    // Update password
    user.password = newPassword; // The pre-save hook will hash it
    await user.save();
    
    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully"
    });
  } catch (error) {
    let message = "Failed to reset password";
    
    if (error.name === "JsonWebTokenError") {
      message = "Invalid or expired token";
    }
    
    return res.status(400).json({
      success: false,
      message
    });
  }
}; 