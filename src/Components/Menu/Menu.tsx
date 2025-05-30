import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../../store";
import {useEffect} from "react";


const Menu = () => {

    const createProj = useSelector((state: RootState) => state.projectSlice.projects);

    useEffect(() => {
        console.log('createProj',createProj)
    }, [createProj]);

    return (
        <div className="bg-[#565454] text-white w-64 h-screen border-r">
            <Link to="home">Home</Link> <br/>
            {createProj.map((project)=>
                <div  key={project.projectName}>
                    <Link to='/'>{project.projectName}</Link>
                    <br/>
                </div>
             )}
        </div>
    )


}
export default Menu;
