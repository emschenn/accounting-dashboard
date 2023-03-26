import React from "react";

type Props = {
  bgColor?: string;
  children: JSX.Element[] | JSX.Element;
};

function Layout({ children, bgColor }: Props) {
  return (
    <main
      className={`m-auto h-full w-full  py-6 px-4 font-sans md:w-1/2 ${
        bgColor ? bgColor : ""
      }`}
    >
      {children}
    </main>
  );
}

export default Layout;
