import { NextRequest, NextResponse } from "next/server";
import Connect from "@/utils/db";
import Class from "@/models/Class";
import ExtractTextFromImage from "@/utils/ImageExtraction";
import verifyToken from "@/utils/verifyToken";
// import bodyParser from "body-parser";
import upload from "@/utils/Upload";
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

Connect();

export async function POST(request) {
  //nprmal app.post(/mainfunction(decoded))
  try {
    const reqBody = await request.json();
    console.log(reqBody);
    const { location } = reqBody;
    if (
      !location ||
      location.latitude === undefined ||
      location.longitude === undefined
    ) {
      console.log("inside else");
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
      console.log("inside else");
      return NextResponse.json(
        { message: "Please login before creating class", error: true },
        { status: 401 }
      );
    }
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
      } else {
        return NextResponse.json(
          { message: "Error while saving class", error: true },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json("Class creation failed");
  }
}
