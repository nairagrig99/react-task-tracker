import {useRef} from "react";
import type {Props} from "../models/props-interface.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../store";

const DragBlock = ({event}: Props) => {

    const inProgressRef = useRef<HTMLDivElement>(null);
    const completeRef = useRef<HTMLDivElement>(null);
    const draftRef = useRef<HTMLDivElement>(null);

    const isMenuOpen = useSelector((state: RootState) => state.store);
    console.log('isMenuOpen', isMenuOpen.toggleMenu);

    if (event?.target) {
        const recursionFindParentElement = (element: HTMLElement | null, parentClass: string) => {
            if (!element) return null;
            if (element.classList.contains(parentClass)) {
                return element;
            }
            return recursionFindParentElement(element.parentElement, parentClass);
        }

        const taskItem = recursionFindParentElement(event.target, 'task-item') as HTMLElement;

        if (taskItem) {
            const shiftX = event.screenX - taskItem.getBoundingClientRect().left;
            const shiftY = event.pageY - taskItem.getBoundingClientRect().top;

            taskItem.style.zIndex = "1000";
            taskItem.style.position = "absolute";

            const moveAt = (x: number, y: number) => {
                if (isMenuOpen.toggleMenu) {
                    taskItem.style.left = x - shiftX - taskItem.offsetWidth + 'px';
                } else {
                    taskItem.style.left = x - shiftX + 'px';
                }
                taskItem.style.top = y - shiftY - taskItem.offsetHeight + 'px';
            }

            moveAt(event.pageX, event.pageY);

            const onMouseMove = (event) => {
                moveAt(event.pageX, event.pageY); // Use pageX/pageY
            }

            const onMouseUp = (event) => {
                const taskItemPosition = taskItem.getBoundingClientRect();
                const removeStyle = () => {
                    taskItem.style.left = 'unset';
                    taskItem.style.top = 'unset';
                    taskItem.style.position = 'unset';
                    taskItem.style.zIndex = 'unset';
                }
                const checkPlace = (task, htmlContent) => {
                    return task && htmlContent &&
                        task.left >= htmlContent.left &&
                        task.right <= htmlContent.right &&
                        task.top >= htmlContent.top &&
                        task.bottom <= htmlContent.bottom;
                }

                const progressBlock = inProgressRef.current?.getBoundingClientRect();
                const completeBlock = completeRef.current?.getBoundingClientRect();
                const draftBlock = draftRef.current?.getBoundingClientRect();

                if (checkPlace(taskItemPosition, progressBlock)) {
                    inProgressRef.current.append(taskItem);
                    removeStyle();
                } else if (checkPlace(taskItemPosition, completeBlock)) {
                    completeRef.current.append(taskItem);
                    removeStyle();
                } else if (checkPlace(taskItemPosition, draftBlock)) {
                    draftRef.current.append(taskItem);
                    removeStyle();
                } else {
                    removeStyle(); // Reset styles even if dropped outside
                }

                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }
    }


    return (
        <div className="task-status flex flex-nowrap text-center gap-5 overflow-x-auto w-full">
            <div className="inprogress w-[265px] border shrink-0">
                <h3 className="border">In progress</h3>
                <div ref={inProgressRef}
                     className="inprogress-list text-left overflow-x-hidden p-2 flex flex-col gap-2 h-[370px] overflow-y-auto relative"></div>
            </div>
            <div className="complete w-[265px] border shrink-0">
                <h3 className="border">Complete</h3>
                <div ref={completeRef}
                     className="complete-list text-left overflow-x-hidden p-2 flex flex-col gap-2 h-[370px] overflow-y-auto relative"></div>
            </div>
            <div className="draft w-[265px] border shrink-0">
                <h3 className="border">Draft</h3>
                <div
                    ref={draftRef}
                    className="draft-list text-left overflow-x-hidden p-2 flex flex-col gap-2 h-[370px] overflow-y-auto relative"></div>
            </div>
        </div>
    )
}

export default DragBlock;