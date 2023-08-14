

import { NextRequest, NextResponse } from "next/server";
import Connect from "@/utils/db";
import Class from "@/models/Class";

Connect();
import verifyToken from "@/utils/verifyToken"; // Import the verifyToken function

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { location } = reqBody;
    if (
      !location ||
      location.latitude === undefined ||
      location.longitude === undefined
    ) {
      return NextResponse.json(
        { message: "Plaese provide a Location" },

        { status: 400 }
      );
    }

    // Step 1: Retrieve the token from the cookies
    const cookies = await request.cookies;

    const authToken = request.cookies._parsed.get("token")?.value || "";

    // Step 2: Verify the token
    const userData = await verifyToken(authToken);
    if (!userData) {
      return NextResponse.json(
        { message: "Please login before creating class", error: true },
        { status: 401 }
      );
    }

    // console.log("Request Body:", reqBody);

    const newClass = new Class(reqBody);

    try {
      const savedClass = await newClass.save();
      console.log("Saved Class:", savedClass);
      return NextResponse.json(
        { message: "Class has been created", success: true, savedClass },
        { status: 201 }
      );
    } catch (saveError) {
      console.error("Save Error:", saveError);

      // Handle duplicate key error (code 11000)
      if (saveError.code === 11000) {
        return NextResponse.json(
          { message: "Try to change passcode", error: true },
          { status: 400 }
        );
      }

      return NextResponse.json("Error while saving class");
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json("Class creation failed");
  }
}
