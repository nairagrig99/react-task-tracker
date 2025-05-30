import {createPortal} from "react-dom";
import React, {type ReactNode, useEffect, useRef} from "react";

const Modal: React.FC<{
    open: boolean,
    children?: ReactNode,
    classes: string
}> = ({open, children, classes}) => {

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const modal = dialogRef.current;
        if (open) {
            modal?.showModal();
        }
        return () => modal?.close();
    }, [open]);


    return createPortal(
        <dialog ref={dialogRef} open={true} className={classes}>
            {children}
        </dialog>,
        document.getElementById('modal')!)
}
export default Modal;