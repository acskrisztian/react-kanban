import SidebarGroup from "./SidebarGroup";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface SidebarProps {
  menuOpened: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ menuOpened }) => {
  const boards = useSelector((state: RootState) => state.boards.boards);

  return (
    <div
      className={`bg-background p-[8px] lg:p-[16px] lg:py-[24px] rounded-r-2xl w-[260px] absolute h-full lg:h-auto lg:relative -left-[260px] lg:left-0 lg:-ml-[260px] transition-all duration-300 z-10  shadow-lg ${
        menuOpened ? "left-0 lg:ml-0" : ""
      }`}
    >
      <SidebarGroup title="Team Boards" items={boards} />
    </div>
  );
};

export default Sidebar;
