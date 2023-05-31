// "use client";

// import { useSession, signIn, signOut } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// // import { signOut } from "next-auth/react";

// export function SignInButton() {
//   const { data: session, status } = useSession();
//   console.log(session, status);

//   if (status === "loading") {
//     return <>...</>;
//   }

//   if (status === "authenticated") {
//     return (
//       <Link href={`/dashboard`}>
//         <Image
//           src={
//             session.user?.image ??
//             "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.seekpng.com%2Fpng%2Fdetail%2F115-1150053_avatar-png.png&f=1&nofb=1&ipt=854e4f63f8dbe758d14027ad802c844379d20b71fd916cf7b436fbb68e438d05&ipo=images"
//           }
//           width={32}
//           height={32}
//           alt="avatar"
//         />
//       </Link>
//     );
//   }

//   return <button onClick={() => signIn()}>Sign in</button>;
// }

// export function SignOutButton() {
//   return <button onClick={() => signOut()}>Sign out</button>;
// }
