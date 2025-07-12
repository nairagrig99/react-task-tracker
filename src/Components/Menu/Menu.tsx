import {Link, useLoaderData} from "react-router-dom";
import type {ProjectState} from "../../models/project-state.interface.ts";

const Menu = () => {
    const menuItems:ProjectState[] = useLoaderData();

    return (
        <div className="bg-[#565454] min-w-[250px] text-white w-64 h-screen border-r">
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
