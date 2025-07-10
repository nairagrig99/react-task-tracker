import {useParams} from "react-router-dom";
import type {ProjectState} from "../../models/project-state.interface.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import {useState} from "react";
import DragBlock from "../DragBlock.tsx";

export default function TaskListItem() {
    const [dragItem, setDragItem] = useState();

    const project = useSelector((state: RootState) => state.projectSlice.projects);
    const params = useParams();

    let id = 0;
    if (params.id) {
        id = parseInt(params.id);
    }

    const filtered: ProjectState | undefined = project.find((item: ProjectState) => +item.id === id);

    const dragElement = (event) => {
        console.log('event',event);
        setDragItem(event)
    }

    return <div className="drag-and-drop__section flex gap-10 relative">
        <div className="flex flex-col gap-4  w-[370px]">
            {filtered?.taskList.map((item) => (
                <div onMouseDown={(event) => dragElement(event)}
                     className="w-[250px] border px-2.5 py-3 rounded-md task-item cursor-pointer" key={item.id}>
                    <h2 className="capitalize mb-3">{item.name}</h2>
                    <div className="flex gap-2.5">
                        <p className="capitalize px-[5px] py-[2px] rounded-[15px] bg-[#c8c09b] text-black">{item.priority}</p>
                    </div>
                </div>
            ))}
        </div>

        <DragBlock event={dragItem}></DragBlock>

    </div>
}
