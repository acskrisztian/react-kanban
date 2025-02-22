import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Board {
  id: string;
  title: string;
}

interface BoardsState {
  boards: Board[];
}

const initialState: BoardsState = {
  boards: [],
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards: (state, action: PayloadAction<Board[]>) => {
        state.boards = [...action.payload];
    },
    addBoard: (state, action: PayloadAction<Board>) => {
      state.boards.push(action.payload);
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board.id !== action.payload);
    }
  },
});

export const { addBoard, setBoards } = boardsSlice.actions;
export default boardsSlice.reducer;