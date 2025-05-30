import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    toggleMenu: true,
    isModal: false
}

const store = createSlice({
    name: 'toggle',
    initialState: initialState,
    reducers: {
        toggleMenu(state) {
            state.toggleMenu = !state.toggleMenu;
        },
        openModal(state) {
            state.isModal = !state.isModal
        }
    }
})

export const action = store.actions;
export default store;