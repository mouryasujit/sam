import verifyToken from "@/utils/verifyToken";
import User from "@/models/UserModel";
import Class from "@/models/Class";
import { NextResponse } from "next/server";
import calculateDistanceInMeters from "@/utils/calculateDistance";

export async function POST(request) {
  try {
    const cookies = await request.cookies;

    const authToken = request.cookies._parsed.get("token")?.value || "";
    const userData = await verifyToken(authToken);

    if (!userData) {
      return NextResponse.json(
        { message: "Please login before Joining class", error: true },
        { status: 401 }
      );
    }

    // console.log(userData);
    const { email } = userData;
    const user = await User.findOne({ email });
    // console.log(user);

    const reqBody = await request.json();
    const { location, studentip, passcode, Bluetooths } = reqBody;

    const classData = await Class.findOne({ passcode });
    // console.log(classData);
    if (!classData) {
      return NextResponse.json(
        { message: "Class doesnt exists check passcode" },
        { status: 404 }
      );
    }
    if (Bluetooths) {
      if (classData.studentIp.includes(studentip)) {
        return NextResponse.json(
          { message: "You are already in class" },
          { status: 400 }
        );
      }

      classData.studentIp.push(studentip);
      const studentData = {
        name: user.name,
        rollno: user.rollno,
        div: user.division,
        Date: new Date().getDate(),
        JoinedTime: new Date().getTime(),
      };
      classData.students.push(studentData);

      await classData.save();

      return NextResponse.json(
        { message: "Student added successfully", success: true, classData },
        { status: 200 }
      );
    }

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

    // const classData = await Class.findOne({ passcode });
    // // console.log(classData);
    // if (!classData) {
    //   return NextResponse.json(
    //     { message: "Class doesnt exists check passcode" },
    //     { status: 404 }
    //   );
    // }

    //  calculate distance
    console.log(location.latitude);
    console.log(location.longitude);
    const distance = await calculateDistanceInMeters(
      classData?.location.latitude,
      classData?.location.longitude,
      location?.latitude,
      location?.longitude
    );

    console.log(distance);
    if (distance > 10) {
      return NextResponse.json(
        { message: "You are not inside class" },
        { status: 401 }
      );
    }
    // classInstance.studentIp.includes(ipAddress)
    if (classData.studentIp.includes(studentip)) {
      return NextResponse.json(
        { message: "You are already in class" },
        { status: 400 }
      );
    } else {
      classData.studentIp.push(studentip);
      const studentData = {
        name: user.name,
        rollno: user.rollno,
        div: user.division,
        Date: new Date().getDate(),
        JoinedTime: new Date().getTime(),
      };
      classData.students.push(studentData);
    }
    await classData.save();

    return NextResponse.json(
      { message: "Student added successfully", success: true, classData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
