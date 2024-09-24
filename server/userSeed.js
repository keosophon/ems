import User from "./models/User.js";
import bcrypt from "bcrypt";
import connectDB from "./db/db.js";

const userRegister = async () => {
  await connectDB();
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash("admin", salt);
  try {
    const user = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await user.save();
  } catch (error) {
    console.log(error);
  }
};

userRegister();
