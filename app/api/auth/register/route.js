import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { fullName, email, password } = await request.json();

  await connect();
  const user = await User.findOne({
    email: email,
  });
  if (user) {
    return new NextResponse("User already Exist!", {
      status: 400,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 5);

  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};
