import Layout from "./components/Layout";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./utils/AuthProvider";

export const metadata = {
  title: "Console.love()",
  description: "The meeting ground for a loving relationship between devs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <head>
          <title>Console.love()</title>
          <meta name="description" content={metadata.description} />
          <script
            defer
            src="https://kit.fontawesome.com/766e633129.js"
            crossOrigin="anonymous"
          ></script>
        </head>
        <body>
          <Layout></Layout>
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
