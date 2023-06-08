"use client";
import React from "react";
import Drawer from "./Drawer";
import { SocketProvider } from "../context/SocketContext";

const Layout = ({ children }: any) => (
  <>
    <SocketProvider>
      <Drawer />
      {children}
    </SocketProvider>
  </>
);

export default Layout;
