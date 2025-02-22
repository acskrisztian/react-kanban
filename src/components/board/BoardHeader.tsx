import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface BoardHeaderProps {
  title: string;
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ title }) => {
  return (
<div className="flex items-center p-[8px]">
      <h1>{title}</h1>
      <div className="ms-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="cursor-pointer">
              <EllipsisVertical size={24} />
            </button>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BoardHeader;
