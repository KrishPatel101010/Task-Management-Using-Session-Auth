import { User } from "../models/index.ts";
import bcrypt from "bcrypt";

export const signUpService = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const emailExist = await User.findOne({ email: data.email });
  if (emailExist) throw new Error("Email already exist");
  else {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await User.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
    return newUser;
  }
};

export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  const user = await User.findOne({ email: data.email });

  if (!user) throw new Error("Email not found.");
  else {
    const result = await bcrypt.compare(data.password, user.password);
    if (!result) throw new Error("Password is incorrect");
    else {
      return user;
    }
  }
};
