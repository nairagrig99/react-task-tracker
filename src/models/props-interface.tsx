import type {TaskList} from "./project-state.interface.ts";
import React from "react";

export interface Props {
    name?: string,
    placeholder?: string,
    classes?: string,
    options?: Option[],
    taskItem?: TaskList,
    event?: React.MouseEvent<HTMLDivElement>,
    mouseInteraction?: () => void
}

export interface Option {
    value: string,
    optionName: string
}