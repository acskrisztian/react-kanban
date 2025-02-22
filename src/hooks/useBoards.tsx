import { getBoards } from "@/lib/boards";
import { setBoards } from "@/store/boardsSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useBoards = (id: string) => {
  const dispatch = useDispatch();
  const boards = useSelector((state: RootState) => state.boards);

  useEffect(() => {
    if (!id) return;

    const fetchBoards = async () => {
      try {
        const boards = await getBoards(id);
        dispatch(setBoards(boards));
      } catch (error) {
        console.error("Failed to fetch boards", error);
      }
    };

    fetchBoards();
  }, [id, dispatch]);

  return boards.boards;
};

export default useBoards;
