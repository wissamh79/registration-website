import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Attend from "@/models/Attend";
import Accepted from "@/models/Accepted";
export const GET = async (request) => {
  try {
    await connect();

    const attend = await Attend.find();

    return new NextResponse(JSON.stringify(attend), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const { fullName, email, phoneNumber } = await request.json();
  if ((!fullName, !email, !phoneNumber)) {
    return new NextResponse("All fields are required", { status: 400 });
  }
  try {
    await connect();
    const findAttend = await Attend.findOne({
      email: email,
    });
    if (findAttend) {
      return new NextResponse("The given email already Exist!", {
        status: 400,
      });
    }
    const checkAttend = await Accepted.findOne({
      email: email,
    });

    if (checkAttend) {
      await Attend.create({ fullName, email, phoneNumber });
      return new NextResponse(
        "Thank's for Attending You have been registered ",
        { status: 201 }
      );
    } else {
      return new NextResponse("You haven't been Accepted", { status: 403 });
    }
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
