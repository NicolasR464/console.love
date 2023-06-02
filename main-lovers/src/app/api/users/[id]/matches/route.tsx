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

// // GET the languages of connected user
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//     const userId = params.id;
  
//     await connectMongo();
//     try {
//       const data = await users.findOne({ _id: userId });
//       if (data) {
//         const { languages } = data; // Extract the 'languages' property from the 'data' object
  
//         return NextResponse.json({ languages }, { status: 200 }); // Include 'languages' in the response
//       } else {
//         return NextResponse.json({ message: "User not found" }, { status: 404 });
//       }
//     } catch (error) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
// }

// // GET users with matching languages == OK
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const userId = params.id;

//   await connectMongo();
//   try {
//     const firstUser = await users.findOne({ _id: userId });
//     if (firstUser) {
//       const { languages } = firstUser; // Extract the 'languages' property from the first user

//       const matchingUsers = await users.find({ languages: { $in: languages } });

//       return NextResponse.json({ users: matchingUsers }, { status: 200 }); // Include matching users in the response
//     } else {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//   } catch (error) {
//     return NextResponse.json({ message: "User not found" }, { status: 404 });
//   }
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

// // GET users within a 30km radius of the given geolocation
// export async function GET(req: Request, { params }: { params: { id: string } }) {
//     const userId = params.id;
  
//     await connectMongo();
//     try {
//       const user = await users.findOne({ _id: userId });
//       if (user) {
//         const { geoloc } = user;
  
//         // Find users within a 10km radius of the geolocation
//         const nearbyUsers = await users.find({
//           geoloc: {
//             $geoWithin: {
//               $centerSphere: [geoloc, 10 / 6371] // Radius in radians (10km / Earth's radius in km)
//             }
//           }
//         }).exec(); // Execute the query and retrieve the results
  
//         return NextResponse.json({ users: nearbyUsers }, { status: 200 });
//       } else {
//         return NextResponse.json({ message: "User not found" }, { status: 404 });
//       }
//     } catch (error) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }
//   }


// GET users within a 30km radius and with matching languages
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  await connectMongo();
  try {
    const firstUser = await users.findOne({ _id: userId });
    if (firstUser) {
      const { geoloc, languages } = firstUser; // Extract the 'geoloc' and 'languages' properties from the first user

      // Find users within a 30km radius of the geolocation, with matching languages, excluding the user with the specified '_id'
      const matchingUsers = await users.find({
        $and: [
          {
            _id: { $ne: userId } // Exclude the user with the specified '_id'
          },
          {
            geoloc: {
              $geoWithin: {
                $centerSphere: [geoloc, 30 / 6371] // Radius in radians (30km / Earth's radius in km)
              }
            }
          },
          {
            languages: { $in: languages }
          }
        ]
      }).exec(); // Execute the query and retrieve the results

      return NextResponse.json({ users: matchingUsers }, { status: 200 }); // Include matching users in the response
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}