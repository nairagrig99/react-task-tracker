import {createSlice} from "@reduxjs/toolkit";

interface Project {
    projectName: string;
    taskList?: []
}

interface ProjectState {
    projects: Project[];
    taskList: []
}

const initialState: ProjectState = {
    projects: [],
    taskList: []
};

const projectSlice = createSlice({
    name: 'createproject',
    initialState: initialState,
    reducers: {
        createProject(state, action) {
            state.projects.push({
                projectName: action.payload.projectName,
                taskList: state.taskList
            });
        }
    }
})

export const projectAction = projectSlice.actions;
export default projectSlice;