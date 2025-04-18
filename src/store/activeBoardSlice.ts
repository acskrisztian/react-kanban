import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateBoard } from "@/lib/boards";
import { Task } from "@/lib/tasks";

interface User {
  id: string;
  username: string;
}

interface Column {
  id: string;
  title: string;
}

interface ActiveBoardState {
  id: string | null;
  title: string;
  admin: string;
  members: User[];
  columns: Column[];
  columnOrder: string[];
  tasks: Task[];
}

const initialState: ActiveBoardState = {
  id: null,
  title: "",
  admin: "",
  members: [],
  columns: [],
  columnOrder: [],
  tasks: [],
};


const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState: initialState,
  reducers: {
    setActiveBoard: (
      state,
      action: PayloadAction<Omit<ActiveBoardState, "tasks">>
    ) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.admin = action.payload.admin;
      state.columns = action.payload.columns;
      state.columnOrder =
        action.payload.columnOrder ||
        action.payload.columns.map((col) => col.id);
      state.members = action.payload.members;
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    moveTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        toColumnId: string;
        toIndex: number;
      }>
    ) => {
      const { taskId, toColumnId, toIndex } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (!task) return;

      const currentColumnTasks = state.tasks.filter(
        (t) => t.columnId === task.columnId
      );
      const taskIndex = currentColumnTasks.findIndex((t) => t.id === taskId);
      if (taskIndex > -1) {
        currentColumnTasks.splice(taskIndex, 1);
      }

      if (task.columnId !== toColumnId) {
        task.columnId = toColumnId;
      }

      const newColumnTasks = state.tasks.filter(
        (t) => t.columnId === toColumnId
      );
      newColumnTasks.splice(toIndex, 0, task);

      state.tasks = [
        ...state.tasks.filter(
          (t) => t.columnId !== task.columnId && t.columnId !== toColumnId
        ),
        ...currentColumnTasks,
        ...newColumnTasks,
      ];
    },
    moveColumn: (
      state,
      action: PayloadAction<{
        columnId: string;
        toIndex: number;
      }>
    ) => {
      const { columnId, toIndex } = action.payload;
      const currentIndex = state.columnOrder.indexOf(columnId);

      if (currentIndex === -1) return;

      state.columnOrder.splice(currentIndex, 1);
      state.columnOrder.splice(toIndex, 0, columnId);

      if (state.id) {
        updateBoard(state.id, {
          columnOrder: state.columnOrder,
        }).catch((error) => {
          console.error("Failed to update column order:", error);
          state.columnOrder.splice(toIndex, 1);
          state.columnOrder.splice(currentIndex, 0, columnId);
        });
      }
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
  },
});

export const { setActiveBoard, setTasks, moveTask, moveColumn, addTask } =
  activeBoardSlice.actions;
export default activeBoardSlice.reducer;
