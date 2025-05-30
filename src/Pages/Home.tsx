import Button from "../UI/Button.tsx";
import Modal from "../Components/Modal/Modal.tsx";
import Input from "../UI/Input.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store";
import {action} from "../store/store.slice.ts";
import {projectAction} from "../store/project.slice.ts";

export default function HomePage() {
    const createProjectBtnStyle = "py-2.5 px-6 bg-green-500 cursor-pointer m-5"
    const cancelProjectBtnStyle = "py-2.5 px-6 bg-red-500 cursor-pointer m-5"

    const dispatch = useDispatch<AppDispatch>()
    const select = useSelector((state: RootState) => state.store.isModal);

    const handleCreateProject = () => {
        dispatch(action.openModal())
    }

    const handleClosePopup = () => {
        dispatch(action.openModal())
    }

    const createProject = (formData: FormData) => {
        const form = Object.fromEntries(formData.entries());
        if (form.projectName != '') {
            dispatch(projectAction.createProject(form))
        }
    }

    return <div>
        <Button classes={createProjectBtnStyle} label="Create Project" handleEvent={handleCreateProject}/>
        <Modal open={select} classes='absolute top-[40%] mx-auto w-[500px] p-5  rounded-[15px]'>
            <div>
                <form action={createProject}>
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