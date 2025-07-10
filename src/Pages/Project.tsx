import {Form, useSubmit} from "react-router-dom";
import Modal from "../Components/Modal/Modal.tsx";
import Input from "../UI/Input.tsx";
import Select from "../UI/Select.tsx";
import Button from "../UI/Button.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store";
import {modalAction} from "../store/modal.slice.ts";
import {useEffect, useRef} from "react";
import {TASK_PRIORITY_OPTIONS, TASK_STATUS_OPTIONS} from "../constants/taskStatusOptions.ts";
import TaskListItem from "../Components/Content/TaskListItem.tsx";
import {fetchSlice} from "../store/project.slice.ts";
import {useForm} from "react-hook-form";
import FormValidation from "../Components/FormValidation.tsx";

export default function ProjectPage() {
    const ref = useRef(null);
    const formRef = useRef(null);
    const modalRef = useRef(null);
    const dispatch = useDispatch<AppDispatch>();
    const modal = useSelector((state: RootState) => state.modal.isModalCreateTask);


    const {register, handleSubmit, formState: {errors}} = useForm();
    const submit = useSubmit()

    useEffect(() => {
        dispatch(fetchSlice())
        // close modal when clicked outside
        const handleClickOutside = (ev: MouseEvent) => {
            const target = ev.target as Node;
            if (modal && modalRef.current && !modalRef.current.contains(target)) {
                dispatch(modalAction.openCreateTaskModal());
            }
        };

        if (modal) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatch, modal]);
    const openModal = () => {
        dispatch(modalAction.openCreateTaskModal())
    }

    const onValid = (form, event) => {
        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }
        console.log('iiiiiiiii',formData.get('id'));
        event.preventDefault()
        submit(formData, {
            method: 'post',
            encType: 'application/x-www-form-urlencoded',
        });
    };

    return <div ref={ref}>
        <Button handleEvent={openModal} classes="bg-[#0aea0a] cursore-pointer p-2 mb-4" label='Create Task'/>

        <Modal open={modal} classes="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div ref={modalRef}>
                <form ref={formRef}
                      method="post"
                      onSubmit={handleSubmit(onValid)}
                      className="create-task__form w-[500px] max-w-full grid gap-5 p-4">
                    <Input {...register('id')} type="hidden" name="id" value={Date.now()}/>
                    <Input {...register('name', {required: 'Name is required'})} name="name" placeholder="Task Name"
                           classes="border p-2"/>
                    <textarea {...register('description', {required: 'Description is required'})} name="description"
                              placeholder="Task Description"
                              className="border p-2"/>
                    <Input {...register('date')} name="date" type="date" placeholder="Deadline" classes="border p-2"/>
                    <Select {...register('status')} name="Status" placeholder="Status" classes="border p-2"
                            options={TASK_STATUS_OPTIONS}/>
                    <Select {...register('priority')} name="Priority" placeholder="Priority" classes="border p-2"
                            options={TASK_PRIORITY_OPTIONS}/>
                    <FormValidation errors={errors}/>
                    <Button label="Create Task" type="submit" classes="bg-[#0aea0a] cursore-pointer p-2"/>
                </form>
            </div>
        </Modal>
        <TaskListItem/>
    </div>
}

export async function taskAction({request, params}) {

    const response = await request.formData();
    const formData = Object.fromEntries(response.entries());
    console.log('formData', formData);
    try {
        const projectFetch = await fetch(`http://localhost:3000/projects/${params.id}`);
        const projects = await projectFetch.json();

        const updatedTaskList = [...projects.taskList, formData];

        await fetch(`http://localhost:3000/projects/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...projects,
                taskList: updatedTaskList
            })
        });
        return null
    } catch (error) {
        return {message: `failed to load ${error}`}
    }


}