import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Attend from "@/models/Attend";

export const POST = async (request) => {
  const { email, phoneNumber } = await request.json();
  if ((!email, !phoneNumber)) {
    return new NextResponse("All fields are required", { status: 400 });
  }
  try {
    await connect();

    const findAttendByEmail = await Attend.findOne({
      email: email,
    });
    const findAttendByPhoneNumber = await Attend.findOne({
      phoneNumber: phoneNumber,
    });

    if (!findAttendByEmail && !findAttendByPhoneNumber) {
      return NextResponse.json(
        { message: "You haven't been Accepted" },
        { status: 403 }
      );
    }

    return new NextResponse("Thank's for Attending You have been Conform ", {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
