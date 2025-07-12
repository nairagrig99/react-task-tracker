import React from "react";

type InputProps = {
    placeholder?: string;
    classes?: string;
    type?: string;
    name: string;
    value?: string | number;
} & React.InputHTMLAttributes<HTMLInputElement>;
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ placeholder, classes, type = "text", name, value, ...rest }, ref) => {
    return <>
        <input
        ref={ref}
            value={value ?? value}
               className={classes}
               name={name}
               type={type ?? "text"}
               placeholder={placeholder}
               {...rest}
        />
    </>
})
export default Input;