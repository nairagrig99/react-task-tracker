import {Link, useLoaderData} from "react-router-dom";
import type {ProjectState} from "../../models/project-state.interface.ts";

const Menu = () => {

    // const createProj = useSelector((state: RootState) => state.projectSlice.projects);

    const menuItems:ProjectState[] = useLoaderData();

    // console.log('menu items', menuItems);

    return (
        <div className="bg-[#565454] text-white w-64 h-screen border-r">
            <Link to="home">Home</Link> <br/>
            {
                menuItems.map((project) =>
                <div key={project["id"]} className="border-b border-solid  p-[5px]">
                    <Link
                        to={{
                            pathname: `/${project["id"]}`,
                        }}
                        state={{
                            data: project,
                        }}
                        className="capitalize text-[#0aea0a]"
                    >
                        {project["projectName"]}
                    </Link>
                    <br/>
                </div>
            )}
        </div>
    )
}

export default Menu;
