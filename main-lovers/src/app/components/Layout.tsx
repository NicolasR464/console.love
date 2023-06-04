import React, { ReactNode } from "react";
import NavBar from "./NavBar";


const Layout: React.FC<any> = () => {
  return (
    // Your layout JSX code goes here
    <div className="flex justify-between">
      <NavBar />

    </div>
  );
};

export default Layout;
