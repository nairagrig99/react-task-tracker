export interface ProjectState {
    id: number;
    projectName: string;
    taskList:TaskList [];
}

export interface TaskList {
    id:number,
    name: string,
    description: string,
    date: string,
    status: string,
    priority: string
}