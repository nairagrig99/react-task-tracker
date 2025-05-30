import {configureStore} from "@reduxjs/toolkit";
import store from "./store.slice.ts";
import projectSlice from "./project.slice.ts";


export const generalStore = configureStore({
    reducer: {
        store: store.reducer,
        projectSlice:projectSlice.reducer
    }
})

export type RootState = ReturnType<typeof generalStore.getState>;
export type AppDispatch = typeof generalStore.dispatch;

// export default generalStore;