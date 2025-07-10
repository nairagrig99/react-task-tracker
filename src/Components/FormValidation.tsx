import type {FieldErrors} from "react-hook-form";
import type {TaskList} from "../models/project-state.interface.ts";


type FormValidationProps = {
    errors: FieldErrors<TaskList>;
};
export default function FormValidation({errors}:FormValidationProps){
    return (
        <>
            <p>{errors.name && <p>{errors.name.message}</p>}</p>
            <p>{errors.description && <p>{errors.description.message}</p>}</p>
        </>

    )
}