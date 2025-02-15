import { Radiation } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="p-[8px] lg:p-[16px] border-r border-gray-400">
      <div className="flex items-center gap-[8px]">
        <Radiation size={24} fill="yellow" />
        <span>React Kanban</span>
      </div>
    </div>
  );
};

export default Sidebar;
