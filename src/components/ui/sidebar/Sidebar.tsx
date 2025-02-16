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
      className={`bg-background p-[8px] lg:p-[16px] lg:py-[24px] border-r border-border w-[260px] absolute h-full lg:h-auto lg:relative -left-[260px] lg:left-0 lg:-ml-[260px] transition-all duration-300 z-10 ${
        menuOpened ? "left-0 lg:ml-0" : ""
      }`}
    >
      <div className="flex items-center gap-[8px] mb-[24px]">
        <span>React Kanban</span>
      </div>
      <SidebarGroup
        title="Team Boards"
        items={boards}
      />
    </div>
  );
};

export default Sidebar;
