import { NextRequest, NextResponse } from "next/server";
import Connect from "@/utils/db";
// import Class from ""
import Class from "@/models/Class";

Connect();

export async function GET(request) {
  try {
    const id = await request?.url?.split("/")[5];
    // console.log("pathnannrwejrwejrwe---", id);
    const CLassDetails = await Class.findById({ _id: id });
    // console.log(CLassDetails);
    if (CLassDetails) {
      return NextResponse.json({ CLassDetails });
    } else {
      return NextResponse.json({
        message: "Something went wrong Please refersh",
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error Try again" },
      { status: 500 }
    );
  }
}
