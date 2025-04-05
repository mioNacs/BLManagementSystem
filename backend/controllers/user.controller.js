import axios from "axios";
import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  // get the data from the request body
  // validate the data
  // check if the user already exists

  try {
    const {
      username,
      password,
      email,
      gender,
      semester,
      branch,
      rollNo,
      course,
      contactNo,
      name,
    } = req.body;
    console.log(req.body);
    if (
      !username ||
      !password ||
      !email ||
      !gender ||
      !semester ||
      !branch ||
      !rollNo ||
      !course ||
      !contactNo ||
      !name
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    if (!/^[0-9]{10}$/.test(contactNo)) {
      return res.status(400).json({ message: "Invalid contact number" });
    }
    try {
      const response = await axios.get(
        `https://api.emaillistverify.com/api/verifyEmail`,
        {
          params: {
            secret: process.env.EMAIL_API_KEY,
            email: email,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error checking user existence:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser };
