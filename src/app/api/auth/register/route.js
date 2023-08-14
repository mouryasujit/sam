import Connect from "@/utils/db";
import User from "@/models/UserModel";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

Connect();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    // console.log(reqBody);
    const { name, division, rollno, email, password, typeIs } = reqBody;

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse({ message: "User ALready exists" }, { status: 409 });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      division,
      rollno,
      email,
      password: hashpassword,
      typeIs,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json(
      { message: "User has been created", success: true, savedUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
