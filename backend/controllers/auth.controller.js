import User from "../models/user.model.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import response from "../utils/generateResponse.js";
import jwtToken from "../utils/generateToken.js";

export const registerController = async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword, userType } = req.body;

    if (!fullName) {
      return response(res, 400, false, "Fullname is required");
    }

    if (!fullName.length > 6) {
      return response(
        res,
        400,
        false,
        "Full Name should contain atleast 6 characters"
      );
    }

    if (!email) {
      return response(res, 400, false, "Email is required");
    }

    if (!validator.isEmail(email)) {
      return response(res, 400, false, "lease enter a valid email");
    }

    if (!password) {
      return response(res, 400, false, "Password is required");
    }

    if (!confirmPassword) {
      return response(res, 400, false, "Confirm Password is required");
    }

    if (password !== confirmPassword) {
      return response(res, 400, false, "Passwords don't match");
    }

    if (!userType) {
      return response(res, 400, false, "Type of User must be specified");
    }

    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      return response(res, 400, false, "User already exists, please login...");
    }

    // PASSWORD HASH
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // PROFILE AVATAR FROM "https://avatar.iran.liara.run"
    const queryParamsForAvatar = fullName.replace(" ", "+");
    const profileAvatar = `https://avatar.iran.liara.run/username?username=${queryParamsForAvatar}`;

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profileAvatar,
      userType,
    });

    if (newUser) {
      await newUser.save();

      // generating a jwt token with the registered user id
      jwtToken(newUser._id, res);

      const userDto = {
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profileAvatar: newUser.profileAvatar,
        userType: newUser.userType,
        role: newUser.role,
      };

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: userDto,
      });
    } else {
      return response(res, 400, false, "Invalid user data");
    }
  } catch (error) {
    console.log("Error in register controller", error.message);
    return response(res, 500, false, "Internal Server Error");
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return response(res, 400, false, "Email is required");
    }
    if (!validator.isEmail(email)) {
      return response(res, 400, false, "Invalid email format");
    }
    if (!password) {
      return response(res, 400, false, "Password is required");
    }
    if (password.length < 6) {
      return response(
        res,
        400,
        false,
        "Password should contain atleast 6 characters"
      );
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      return response(res, 404, false, "Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return response(res, 404, false, "Invalid email or password");
    }

    // GENERATING TOKEN FOR THE RETRIEVED USER
    jwtToken(user._id, res);

    const userDto = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profileAvatar: user.profileAvatar,
      userType: user.userType,
      role: user.role,
    };

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: userDto,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    response(res, 500, false, "Internal server error");
  }
};

export const logoutController = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    response(res, 200, true, "Logged out successfully");
  } catch (error) {
    console.log("Error in logout controller", error.message);
    response(res, 500, false, "Internal Server Error");
  }
};
