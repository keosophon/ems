import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).send({ message: "User Not found." });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(401).send({ message: "Invalid Password!" });
      return;
    }

    const token = jwt.sign(
      { email: user.email, _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).send({
      message: "Login Successful!",
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    console.log(token);
  } catch (err) {
    res.status(500).send({ message: err });
    console.log(err.message);
  }
};

export { loginController };
