import React from "react";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <main className="w-full lg:w-108 h-96 mx-auto mt-8 lg:mt-24 px-4">
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
