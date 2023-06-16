import Layout from "./components/Layout";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./utils/AuthProvider";
import Drawer from "./components/Drawer";
import { SocketProvider } from "./context/SocketContext";
import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata = {
  title: "Console.love()",
  description: "The meeting ground for a loving relationship between devs",
};

export default async function RootLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: any;
}) {
  // console.log("PARAMS", params);
  const session = await getServerSession(authOptions);

  return (
    <AuthProvider>
      <html data-theme="light" lang="en">
        <head>
          <title>console.love()</title>

          <meta name="description" content={metadata.description} />
          <script
            defer
            src="https://kit.fontawesome.com/766e633129.js"
            crossOrigin="anonymous"
          ></script>
        </head>
        <body>
          <Layout></Layout>
          <SocketProvider>
            <main className="flex max-h-screen flex-col items-center justify-between">
              <div
                className="hero h-[90vh] w-full"
                style={{
                  backgroundImage: `url("https://cdn.shopify.com/s/files/1/0295/8036/1827/articles/BLOG_1_fabc8a00-f5a9-41c4-903f-69a7cc2bdeb9.jpg?v=1602242282")`,
                }}
              >
                {/* {params === "/admin" && <Drawer />} */}

                {session && <Drawer />}

                {children}
              </div>
            </main>
          </SocketProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
