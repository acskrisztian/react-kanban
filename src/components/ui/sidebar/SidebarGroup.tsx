import { ChevronDown, Columns3, Plus } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { useDispatch } from "react-redux";
import { openCreateBoardModal } from "@/store/modalSlice";

interface SidebarGroupProps {
  title: string;
  items: any[];
}
const SidebarGroup: React.FC<SidebarGroupProps> = ({ title, items }) => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const location = useLocation();

  return (
    <>
      <div
        className="flex items-center text-[14px] gap-[16px] cursor-pointer pb-[4px] border-b border-border group mb-[4px]"
        onClick={() => setIsCollapsed((prev) => !prev)}
      >
        <span className="flex items-center gap-[4px]">
          <Columns3 size={16} />
          {title}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(openCreateBoardModal());
          }}
          className="relative z-10 opacity-0 bg-secondary p-[4px] rounded-full cursor-pointer transition-all duration-100 shadow group-hover:opacity-100"
        >
          <Plus size={12} />
        </button>
        {items.length > 0 && (
          <span
            className={`cursor-pointer transition-all duration-300 ml-auto ${
              isCollapsed ? "rotate-180" : ""
            }`}
          >
            <ChevronDown size={16} />
          </span>
        )}
      </div>
      <AnimatePresence initial={false}>
        {isCollapsed && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-[14px] overflow-hidden"
          >
            {items.map((item) => {
              const isActive = location.pathname === `/board/${item.id}`;

              return (
                <div className="py-[4px] relative" key={item.id}>
                  {isActive && (
                    <motion.div
                      layoutId="activeLinkBg"
                      className="absolute inset-0 bg-secondary rounded-r-full border-l-2 border-primary"
                      transition={{
                        duration: 0.1,
                        ease: "easeOut",
                      }}
                    />
                  )}
                  <NavLink
                    className="block relative z-10 px-[8px]"
                    to={`/board/${item.id}`}
                  >
                    {item.title}
                  </NavLink>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarGroup;
