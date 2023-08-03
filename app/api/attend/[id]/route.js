import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Attend from "@/models/Attend";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const attend = await Attend.findById(id);

    return new NextResponse(JSON.stringify(attend), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  const { id } = params;
  const body = await request.json();

  try {
    await connect();

    const attend = await Attend.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return new NextResponse(JSON.stringify(attend), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Attend.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
