import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Accepted from "@/models/Accepted";

export const GET = async (request) => {
  try {
    await connect();

    const accepted = await Accepted.find();

    return new NextResponse(JSON.stringify(accepted), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const { fullName, email, phoneNumber } = await request.json();
  console.log(fullName, email, phoneNumber);
  if (!fullName || !email || !phoneNumber) {
    return new NextResponse("All fields are required", { status: 400 });
  }
  try {
    await connect();
    const findAcceptedByEmail = await Accepted.findOne({
      email: email,
    });
    const findAcceptedByPhoneNumber = await Accepted.findOne({
      phoneNumber: phoneNumber,
    });
    console.log(findAcceptedByEmail || findAcceptedByPhoneNumber);
    if (findAcceptedByEmail || findAcceptedByPhoneNumber) {
      return NextResponse.json(
        { message: "The given email already Exist!" },
        { status: 400 }
      );
    }

    await Accepted.create({ fullName, email, phoneNumber });

    return new NextResponse("Accepted has been created", { status: 201 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
