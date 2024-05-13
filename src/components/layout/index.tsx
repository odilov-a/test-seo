import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "components";
import Footer from "components/footer";
import { Content } from "antd/es/layout/layout";

const App: React.FC = () => {
  return (
    <div className="h-full">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
