// import verifyToken from "@/utils/verifyToken";
// import User from "@/models/UserModel";
// import Class from "@/models/Class";
// import { NextResponse } from "next/server";
// import calculateDistanceInMeters from "@/utils/calculateDistance";

// export async function POST(request) {
//   try {
//     const cookies = await request.cookies;

//     const authToken = request.cookies._parsed.get("token")?.value || "";
//     const userData = await verifyToken(authToken);
//     console.log("i am in");
//     if (!userData) {
//       return NextResponse.json(
//         { message: "Please login before Joining class", error: true },
//         { status: 401 }
//       );
//     }

//     // console.log(userData);
//     const { email } = userData;
//     const user = await User.findOne({ email });
//     // console.log(user);

//     const reqBody = await request.json();
//     const { location, studentip, passcode, Bluetooths } = reqBody;

//     const classData = await Class.findOne({ passcode });
//     // console.log(classData);
//     if (!classData) {
//       return NextResponse.json(
//         { message: "Class doesnt exists check passcode" },
//         { status: 404 }
//       );
//     }
//     if (Bluetooths) {
//       if (classData.studentIp.includes(studentip)) {
//         return NextResponse.json(
//           { message: "You are already in class" },
//           { status: 400 }
//         );
//       }

//       classData.studentIp.push(studentip);
//       const studentData = {
//         name: user.name,
//         rollno: user.rollno,
//         div: user.division,
//         Date: new Date().getDate(),
//         JoinedTime: new Date().getTime(),
//       };
//       classData.students.push(studentData);

//       await classData.save();

//       return NextResponse.json(
//         { message: "Student added successfully", success: true, classData },
//         { status: 200 }
//       );
//     }

//     if (
//       !location ||
//       location.latitude === undefined ||
//       location.longitude === undefined
//     ) {
//       return NextResponse.json(
//         { message: "Plaese provide a Location" },
//         { status: 400 }
//       );
//     }

//     // const classData = await Class.findOne({ passcode });
//     // // console.log(classData);
//     // if (!classData) {
//     //   return NextResponse.json(
//     //     { message: "Class doesnt exists check passcode" },
//     //     { status: 404 }
//     //   );
//     // }

//     //  calculate distance
//     console.log(location.latitude);
//     console.log(location.longitude);
//     const distance = await calculateDistanceInMeters(
//       classData?.location.latitude,
//       classData?.location.longitude,
//       location?.latitude,
//       location?.longitude
//     );

//     console.log(distance);
//     if (distance > 10) {
//       return NextResponse.json(
//         { message: "You are not inside class" },
//         { status: 401 }
//       );
//     }
//     // classInstance.studentIp.includes(ipAddress)
//     if (classData.studentIp.includes(studentip)) {
//       return NextResponse.json(
//         { message: "You are already in class" },
//         { status: 400 }
//       );
//     } else {
//       classData.studentIp.push(studentip);
//       const studentData = {
//         name: user.name,
//         rollno: user.rollno,
//         div: user.division,
//         Date: new Date().getDate(),
//         JoinedTime: new Date().getTime(),
//       };
//       classData.students.push(studentData);
//     }
//     await classData.save();

//     return NextResponse.json(
//       { message: "Student added successfully", success: true, classData },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json({ message: `${error}` }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import Connect from "@/utils/db";
import verifyToken from "@/utils/verifyToken";
import User from "@/models/UserModel";
import Class from "@/models/Class";
import calculateDistanceInMeters from "@/utils/calculateDistance";

Connect();

let clients = []; // Array to keep track of connected clients

export async function GET(request) {
  try {
    const urlParts = request.url.split("/");
    const id = urlParts[urlParts.length - 1]; // Extract the ID from the URL

    // Handle SSE connections
    if (request.headers.get("accept") === "text/event-stream") {
      const response = new NextResponse(null, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });

      response.socket.on("close", () => {
        clients = clients.filter((client) => client !== response);
      });

      clients.push(response);
      return response;
    } else {
      // Handle regular GET request
      const classDetails = await Class.findById(id);

      if (classDetails) {
        return NextResponse.json({ classDetails });
      } else {
        return NextResponse.json(
          {
            message: "Something went wrong. Please refresh.",
          },
          { status: 400 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error. Try again." },
      { status: 500 }
    );
  }
}

// Function to send updates to all connected clients
function sendUpdate(data) {
  clients.forEach((client) => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
}

export async function POST(request) {
  try {
    const cookies = await request.cookies;

    const authToken = cookies.get("token")?.value || "";
    const userData = await verifyToken(authToken);

    if (!userData) {
      return NextResponse.json(
        { message: "Please login before Joining class", error: true },
        { status: 401 }
      );
    }

    const { email } = userData;
    const user = await User.findOne({ email });

    const reqBody = await request.json();
    const { location, studentip, passcode, Bluetooths } = reqBody;

    const classData = await Class.findOne({ passcode });

    if (!classData) {
      return NextResponse.json(
        { message: "Class doesn't exist, check passcode" },
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
        Date: new Date(),
        JoinedTime: new Date(),
      };
      classData.students.push(studentData);

      await classData.save();

      // Send update to all connected clients
      sendUpdate(studentData);

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
        { message: "Please provide a Location" },
        { status: 400 }
      );
    }

    const distance = await calculateDistanceInMeters(
      classData.location.latitude,
      classData.location.longitude,
      location.latitude,
      location.longitude
    );

    if (distance > 10) {
      return NextResponse.json(
        { message: "You are not inside class" },
        { status: 401 }
      );
    }

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
        Date: new Date(),
        JoinedTime: new Date(),
      };
      classData.students.push(studentData);
    }
    await classData.save();

    // Send update to all connected clients
    sendUpdate(studentData);

    return NextResponse.json(
      { message: "Student added successfully", success: true, classData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: `${error}` }, { status: 500 });
  }
}
