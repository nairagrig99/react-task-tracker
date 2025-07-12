import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isModal: false,
    isModalCreateTask:false
}

const modal = createSlice({
    name: 'modal',
    initialState: initialState,
    reducers: {
        openModal(state) {
            state.isModal = !state.isModal
        },
        openCreateTaskModal(state){
            state.isModalCreateTask=!state.isModalCreateTask
        }
    }
})

export const modalAction = modal.actions;
export default modal;