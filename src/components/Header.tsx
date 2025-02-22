import useUser from "@/hooks/useUser";
import { on } from "events";
import { MenuIcon, PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface HeaderProps {
  menuOpened: boolean;
  onButtonClicked: () => void;
}

const Header: React.FC<HeaderProps> = ({ menuOpened, onButtonClicked }) => {
  const user = useUser();
  const getFirstLetter = () => {
    return user?.username.charAt(0).toUpperCase();
  };
  return (
    <header className="bg-background relative py-[8px] px-[16px] lg:py-[16px] lg:px-[24px] shadow flex items-center justify-between rounded-lg">
      <div className="hidden lg:block">
        <button className="cursor-pointer" onClick={onButtonClicked}>
          {menuOpened ? (
            <PanelLeftClose size={24} className="text-gray-500" />
          ) : (
            <PanelLeftOpen size={24} className="text-gray-500" />
          )}
        </button>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">React Kanban</div>
      <div className="hidden lg:flex items-center gap-[8px]">
        <div className="flex items-center justify-center h-[32px] w-[32px] rounded-full border border-border text-primary">
          {getFirstLetter()}
        </div>
      </div>
      <div className="lg:hidden ml-auto">
        <button
          className={`p-[4px] cursor-pointer transition-all duration-300 ${
            menuOpened ? "rotate-90" : ""
          }`}
          onClick={onButtonClicked}
        >
          <MenuIcon size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
