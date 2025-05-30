import React from "react";

const Input: React.FC<
        { placeholder:
        string,classes:string ,
        name:string}> = ({placeholder,classes,name}) => {
    return <>
        <input className={classes} name={name} type="text" placeholder={placeholder}/>
    </>
}
export default Input;