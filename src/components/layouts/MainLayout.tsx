import Header from "../Header";
import { Outlet } from "react-router";
import Sidebar from "../ui/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import CreateBoard from "../CreateBoard";

const MainLayout = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const [menuOpened, setMenuOpened] = useState(isLargeScreen);

  useEffect(() => {
    setMenuOpened(isLargeScreen);
  }, [isLargeScreen]);

  const toggleMenu = () => {
    setMenuOpened(!menuOpened);
  };
  return (
    <>
      <div className="flex flex-grow-1">
        <Sidebar menuOpened={menuOpened}/>
        <div className="flex-grow-1">
          <Header menuOpened={menuOpened} onButtonClicked={toggleMenu} />
          <Outlet />
        </div>
      </div>
      <div id="dialog-root">
        <CreateBoard/>
      </div>
    </>
  );
};

export default MainLayout;
