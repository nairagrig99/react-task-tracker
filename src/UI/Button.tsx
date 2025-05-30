import React from "react";
import type {ButtonInterface} from "../models/button-interface.ts";

const Button: React.FC<ButtonInterface> = (props) => {
    return <button type={props.type ?? "button"} className={props.classes} onClick={props.handleEvent}>{props.label}</button>
}
export default Button;