import Header from "../Header";
import { Outlet } from "react-router";
import Sidebar from "../Sidebar";

const MainLayout = () => {
  return (
    <div className="flex flex-grow-1">
      <Sidebar />
      <div className="flex-grow-1">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
