import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {ProjectState} from "../models/project-state.interface.ts";

export const fetchSlice = createAsyncThunk('projects/fetchAll', async () => {
    const request = await fetch('http://localhost:3000/projects');
    return await request.json();
})

interface InitialState {
    projects: ProjectState[];
}

const initialState: InitialState = {
    projects: []
};

const projectSlice = createSlice({
    name: 'createproject',
    initialState: initialState,
    reducers: {
        createProject(state, action) {
            state.projects.push({
                id: action.payload.id,
                projectName: action.payload.projectName,
                taskList: action.payload.taskList ?? []
            });
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchSlice.fulfilled, (state, action) => {
            state.projects = action.payload;
        }).addCase(fetchSlice.rejected,(state, action)=>{
            console.log('error',action.error.message)
        })
    }
})

export const projectAction = projectSlice.actions;
export default projectSlice;