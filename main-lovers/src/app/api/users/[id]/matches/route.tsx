import connectMongo from "../../../../utils/mongoose";
import { NextResponse, NextRequest } from "next/server";
import users from "../../../../models/users";
import calculateDistance from '../../../../components/CalculateDistance';

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


// GET users with multiple conditions to personnalize the Stack
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const userId = params.id;

  await connectMongo();
  try {
    // Fetch the UserDB to get the connected user Datas
    const firstUser = await users.findOne({ _id: userId });
    if (firstUser) {
      // Define multiple Datas which will be used in filtering profiles to create the Stack
      const { geoloc, languages, matched, rejected, attraction, profileStatus } = firstUser;

      // Get the mathing users in the DB using all the defined datas
      const matchingUsers = await users.find({
        $and: [
          // The response is excluding all profiles already in the connected user's matched and rejected arrays
          {
            _id: { $ne: userId, $nin: [...matched, ...rejected] } // Exclude the user with the specified '_id', matched, and rejected users
          },
          // The response is including all profiles where geoloc data is contained in a 30km radius around the connected user position
          {
            geoloc: {
              $geoWithin: {
                $centerSphere: [geoloc, 30 / 6371] // Radius in radians (30km / Earth's radius in km)
              }
            }
          // The response is including all profiles where at least one language is in common with the 'languages' array of the connected user
          },
          {
            languages: { $in: languages }
          },
          // The response is including all profiles where 'sex' is in common with 'attraction' array of the connected user
          {
            sex: { $in: attraction }
          },
          // {
          //   profileStatus: { $in  : profileStatus }
          // }
        ]
      }).exec(); // Execute the query and retrieve the results

      // Calculate the distance for each matching user
      const usersWithDistance = matchingUsers.map((user) => {
        const distance = Math.round(calculateDistance(
          geoloc[1],
          geoloc[0],
          user.geoloc[1],
          user.geoloc[0])
        );

        const age = calculateAge(user.age);

        return {
          ...user.toJSON(),
          age, distance
        };
      });

      // return NextResponse.json({ users: matchingUsers }, { status: 200 });
      return NextResponse.json({ users: usersWithDistance }, { status: 200 });

    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
}

function calculateAge(dateString: string): number | null {
  const today = new Date();
  const birthDate = new Date(dateString);

  if (isNaN(birthDate.getTime())) {
    return null;
  }

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}