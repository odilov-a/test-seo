import React, { useState } from "react";
import { useHooks } from "hooks";

interface MenuItem {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItem[];
  route?: string;
}

// const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const Navigation: React.FC = () => {

  const { navigate } = useHooks();


  const items: MenuItem[] = [
    // {
    //   key: "Portfolio",
    //   label: "Portfolio",
    //   icon: <Portfolio />,
    //   route: "/portfolio",
    // }
  ];

  return (
    <>
      <h1>hello</h1>
    </>
  )
};

export default Navigation;
