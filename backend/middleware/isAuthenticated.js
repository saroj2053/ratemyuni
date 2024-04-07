import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import response from "../utils/generateResponse.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return response(
        res,
        401,
        false,
        "Unauthorized access- No token detected"
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return response(res, 401, false, "Unauthorized - Invalid token");
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return response(res, 404, false, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in isAuthenticated middleware", error.message);
    response(res, 500, false, "Internal Server Error");
  }
};

export default isAuthenticated;
