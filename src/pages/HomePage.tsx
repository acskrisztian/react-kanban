import { openCreateBoardModal } from "@/store/modalSlice";
import { PlusIcon } from "lucide-react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex-1 h-full flex flex-col justify-center items-center">
      <button
        onClick={() => dispatch(openCreateBoardModal())}
        className="cursor-pointer p-[24px] bg-white rounded-full mb-[24px]"
      >
        <PlusIcon size={32} />
      </button>
      <h1 className="font-medium text-[32px] lg:text-[32px] text-gray-400">
        Create a Team Board
      </h1>
    </div>
  );
};

export default HomePage;
