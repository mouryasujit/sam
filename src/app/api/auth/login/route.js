import Connect from "@/utils/db";
import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

Connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User Not found" }, { status: 404 });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const TokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
      division: user.division,
    };

    const token = jwt.sign(TokenData, process.env.NEXTAUTH_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      success: true,
      message: "Login Successfull",
      TokenData,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error Try again" },
      { status: 500 }
    );
  }
}
