import Button from "../UI/Button.tsx";
import Modal from "../Components/Modal/Modal.tsx";
import Input from "../UI/Input.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store";

import {useActionData, useSubmit} from "react-router-dom";
import {useEffect} from "react";
import {fetchSlice, projectAction} from "../store/project.slice.ts";
import {modalAction} from "../store/modal.slice.ts";

export default function HomePage() {
    const createProjectBtnStyle = "py-2.5 px-6 bg-green-500 cursor-pointer m-5";
    const cancelProjectBtnStyle = "py-2.5 px-6 bg-red-500 cursor-pointer m-5";

    const submit = useSubmit();
    const dispatch = useDispatch<AppDispatch>();
    const select = useSelector((state: RootState) => state.modal.isModal);
    const actionData = useActionData();

    const projects = useSelector((state: RootState) => state.projectSlice.projects);

    useEffect(() => {
        dispatch(fetchSlice());
    }, [dispatch,projects.length]);

    useEffect(() => {
        if (actionData != undefined) {
            dispatch(projectAction.createProject(actionData.projects))
        }
    }, [actionData]);

    const handleCreateProject = () => {
        dispatch(modalAction.openModal())
    }

    const handleClosePopup = () => {
        dispatch(modalAction.openModal())
    }

    const createProject = (form: React.FormEvent<HTMLFormElement>) => {
        form.preventDefault()
        const formData=new FormData(form.currentTarget);
        submit(formData, {method: 'POST', action: '/home'});
    }

    return <div>
        <Button classes={createProjectBtnStyle} label="Create Project" handleEvent={handleCreateProject}/>
                <Modal open={select} classes='absolute top-[40%] mx-auto w-[500px] p-5  rounded-[15px]'>
                <div>
                    <form onSubmit={createProject}>
                        <Input
                            name="projectName"
                            placeholder='Project Name'
                            classes='border p-4'/>
                        <div className="flex justify-end">
                            <Button handleEvent={handleClosePopup} label='Cancle' classes={cancelProjectBtnStyle}/>
                            <Button type="submit" label='Create' classes={createProjectBtnStyle}/>
                        </div>
                    </form>
                </div>
            </Modal>
    </div>
}

export async function createProjectHandler({params, request}) {

    const formData = await request.formData();

    const form = Object.fromEntries(formData.entries());

    if (!form.projectName) {
        return {error: true, message: 'Project Name is Required'}
    }

    const url = 'http://localhost:3000/projects';

    const newForm = {
        id: Math.floor(Math.random() * 1000),
        taskList: [],
        ...form
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newForm)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        return {error: false, projects: result}

    } catch (err) {
        return {error: true, message: `failed to load ${err}`}
    }

}