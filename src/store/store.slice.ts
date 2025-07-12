import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    toggleMenu: false
}

const store = createSlice({
    name: 'toggle',
    initialState: initialState,
    reducers: {
        toggleMenu(state) {
            state.toggleMenu = !state.toggleMenu;
        }
    }
})

export const action = store.actions;
export default store;