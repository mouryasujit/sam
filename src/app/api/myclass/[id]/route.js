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
// import { NextRequest, NextResponse } from "next/server";
// import Connect from "@/utils/db";
// import Class from "@/models/Class";

// Connect();

// let clients = []; // Array to keep track of connected clients

// export async function GET(request) {
//   try {
//     const urlParts = request.url.split("/");
//     const id = urlParts[urlParts.length - 1]; // Extract the ID from the URL

//     // Handle SSE connections
//     // console.log(request.headers);
//     if (request.headers.get("accept") === "text/event-stream") {
//       const response = new NextResponse(null, {
//         headers: {
//           "Content-Type": "text/event-stream",
//           "Cache-Control": "no-cache",
//           Connection: "keep-alive",
//         },
//       });

//       response.socket.on("close", () => {
//         clients = clients.filter((client) => client !== response);
//       });

//       clients.push(response);
//       console.log(response);
//       return response;
//     } else {
//       // Handle regular GET request
//       const classDetails = await Class.findById(id);

//       if (classDetails) {
//         return NextResponse.json({ classDetails });
//       } else {
//         return NextResponse.json(
//           {
//             message: "Something went wrong. Please refresh.",
//           },
//           { status: 400 }
//         );
//       }
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Internal server error. Try again." },
//       { status: 500 }
//     );
//   }
// }

// // Function to send updates to all connected clients
// function sendUpdate(data) {
//   clients.forEach = (client) => {
//     client.write(`data: ${JSON.stringify(data)}\n`);
//   };
// }

// // Example usage of sendUpdate when a new user joins the class
// export async function newUserJoined(userId, classId) {
//   const classDetails = await Class.findById(classId);
//   const user = classDetails.users.find((user) => user._id === userId);

//   if (user) {
//     sendUpdate({
//       message: `New user ${user.name} joined the class`,
//       user,
//     });
//   }
// }
