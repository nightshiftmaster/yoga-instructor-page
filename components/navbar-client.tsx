"use client";

import dynamic from "next/dynamic";
import type React from "react";

const DynamicNavbar = dynamic(() => import("@/components/navbar"), {
  ssr: false,

  loading: () => <p>Loading Navbar...</p>,
});

const NavbarClient: React.FC = () => {
  return <DynamicNavbar />;
};

export default NavbarClient;
