import User from "../models/User.js";

const verifyController = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(404).json({ success: false, error: "Token Not Provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      res.status(404).json({ success: false, error: "Token not valid!" });
    }

    const user = await User.findById({ _id: decoded._id }).select("-password");

    if (!user) {
      res.status(404).json({ success: false, error: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};

export { verifyController };
