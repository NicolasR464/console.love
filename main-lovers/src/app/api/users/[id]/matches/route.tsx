import connectMongo from "../../../../utils/mongoose";
import { NextResponse, NextRequest } from "next/server";
import users from "../../../../models/users";

// // get specific user with ID
// export async function GET(req: Request,{params}: { params: { id: string };
// },
// ) {
// const userId = params.id; 


// await connectMongo();
// try {
//     const data = await users.findOne({ _id: userId });
//     return NextResponse.json({ data }, { status: 200 });
//   }catch (error) {
//     return NextResponse.json({ message: "User not found" }, { status: 404 });
//   }
// }

// // GET the city of connected user
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//     const userId = params.id;
  
//     await connectMongo();
//     try {
//       const data = await users.findOne({ _id: userId });
//       if (data) {
//         const { city } = data; // Extract the 'city' property from the 'data' object
  
//         return NextResponse.json({ city }, { status: 200 }); // Include 'city' in the response
//       } else {
//         return NextResponse.json({ message: "User not found" }, { status: 404 });
//       }
//     } catch (error) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
// }

// // GET the geoloc of connected user
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//     const userId = params.id;
  
//     await connectMongo();
//     try {
//       const data = await users.findOne({ _id: userId });
//       if (data) {
//         const { geoloc } = data; // Extract the 'geoloc' property from the 'data' object

//         return NextResponse.json({ geoloc }, { status: 200 }); // Return all users corresponding
//       } else {
//         return NextResponse.json({ message: "User not found" }, { status: 404 });
//       }
//     } catch (error) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
// }

// GET users within a 30km radius of the given geolocation
export async function GET(req: Request, { params }: { params: { id: string } }) {
    const userId = params.id;
  
    await connectMongo();
    try {
      const user = await users.findOne({ _id: userId });
      if (user) {
        const { geoloc } = user;
  
        // Find users within a 30km radius of the geolocation
        const nearbyUsers = await users.find({
          geoloc: {
            $geoWithin: {
              $centerSphere: [geoloc, 30 / 6371] // Radius in radians (30km / Earth's radius in km)
            }
          }
        }).exec(); // Execute the query and retrieve the results
  
        return NextResponse.json({ users: nearbyUsers }, { status: 200 });
      } else {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
    } catch (error) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  }