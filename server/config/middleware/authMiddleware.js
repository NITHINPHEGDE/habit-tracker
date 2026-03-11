import jwt from "jsonwebtoken"
import User from "../../models/User.js"

export const protect = async (req, res, next) => {

  if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
    return res.status(401).json({ message: "No token provided" })
  }

  try {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select("-password")
    next()
  } catch (error) {
    return res.status(401).json({ message: "Not authorized" })
  }

}