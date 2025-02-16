import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isCreateBoardModalOpen: boolean;
}

const initialState: ModalState = {
    isCreateBoardModalOpen: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openCreateBoardModal: (state) => {
            state.isCreateBoardModalOpen = true;
        },
        closeCreateBoardModal: (state) => {
            state.isCreateBoardModalOpen = false;
        },
    }
});

export const { openCreateBoardModal, closeCreateBoardModal } = modalSlice.actions;
export default modalSlice.reducer;