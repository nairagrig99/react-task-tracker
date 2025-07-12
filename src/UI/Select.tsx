import type {Option, Props} from "../models/props-interface.tsx";
import React from "react";

const Select=React.forwardRef<HTMLSelectElement,Props>((props,ref,...rest)=> {
    return <select ref={ref} className={props.classes} {...rest} name={props.name} id="">
        {props?.options?.map((option: Option) => (
            <option key={option.value} value={option.value}>
                {option.optionName}
            </option>
        ))}
    </select>
})
export default Select