import { getBoard } from "@/lib/boards";
import { setActiveBoard } from "@/store/activeBoardSlice";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

const useActiveBoard = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.activeBoard);

  useEffect(() => {
    if (!id) return;

    const fetchBoard = async () => {
      try {
        const boardData = await getBoard(id);
        dispatch(setActiveBoard(boardData));
      } catch (error) {
        console.error("Failed to fetch board", error);
      }
    };

    fetchBoard();
  }, [id, dispatch]);

  return board;
};

export default useActiveBoard;
