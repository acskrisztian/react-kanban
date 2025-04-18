import { getBoard } from "@/lib/boards";
import { getTasksByBoard } from "@/lib/tasks";
import { getUsers } from "@/lib/users";
import { setActiveBoard, setTasks } from "@/store/activeBoardSlice";
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

    const fetchBoardData = async () => {
      try {
        const board = await getBoard(id);
        const users = await getUsers(board.members);
        const tasks = await getTasksByBoard(id);

        board.members = users;

        dispatch(setActiveBoard(board));
        dispatch(setTasks(tasks));
      } catch (error) {
        console.error("Failed to fetch board data", error);
      }
    };

    fetchBoardData();
  }, [id, dispatch]);

  return board;
};

export default useActiveBoard;
