import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
}

interface Column {
  id: string;
  title: string;
}

interface Task {
  id: string;
  columnId: string;
  title: string;
}

interface ActiveBoardState {
  id: string | null;
  title: string;
  admin: string;
  members: User[];
  columns: Column[];
  tasks: Task[];
}

const initialState: ActiveBoardState = {
  id: null,
  title: "",
  admin: "",
  members: [],
  columns: [],
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
      state.members = action.payload.members;
      state.columns = action.payload.columns;
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
  },
});

export const { setActiveBoard, setTasks, moveTask } = activeBoardSlice.actions;
export default activeBoardSlice.reducer;
