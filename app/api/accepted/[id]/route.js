import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Accepted from "@/models/Accepted";

export const GET = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    const accepted = await Accepted.findById(id);

    return new NextResponse(JSON.stringify(accepted), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  const { id } = params;
  const body = await request.json();

  try {
    await connect();

    const accepted = await Accepted.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return new NextResponse.json({
      message: "Accepted has been updated",

      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  const { id } = params;

  try {
    await connect();

    await Accepted.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
