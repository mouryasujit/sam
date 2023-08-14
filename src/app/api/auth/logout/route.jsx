import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout SUccessfull",
      success: true,
    });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
