import Image from "next/image";
import CrudUser from "./CrudAdmin";
import Dashboard from "./Dashboard";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";

let session: any;

export default async function AdminIndex() {
  session = await getServerSession(authOptions);
  console.trace("SESSION NAV BAR ↴");
  // console.log(session);

  let isAdmin = false;

  if (session) {
    isAdmin = session.user.admin;
    // console.log(isAdmin);

    if (isAdmin !== true) redirect("/");
  } else {
    redirect("/");
  }
  return (
    <>
        <div className="h-[100vh] overflow-scroll bg-white/90 -mt-40">
      <div className="mt-32 mx-40">
        <Link href="/admin/stats">
          <button className="btn">STATISTICS</button>
        </Link>
          <CrudUser />
        {/* <Dashboard /> */}
      </div>
        </div>
    </>
  );
}
