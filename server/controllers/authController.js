import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log({ email, password });
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ success: false, error: "User Not found." });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(404).json({ success: false, error: "Wrong Password" });
      return;
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );

    res.status(200).send({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
    console.log(err.message);
  }
};

const verify = (req, res) =>
  res.status(200).json({ success: true, user: req.user });

export { loginController, verify };
