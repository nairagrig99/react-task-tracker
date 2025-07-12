import Header from "../Components/Header/Header.tsx";
import Menu from "../Components/Menu/Menu.tsx";
import Content from "../Components/Content/Content.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "../store";

export default function RootLayout() {
    const store = useSelector((state: RootState) => state.store);

    return (
        <>
            <div>
                <div>
                    <Header/>
                </div>
                <div className="flex">
                    {store.toggleMenu && <Menu/>}
                    <Content/>
                </div>
            </div>
        </>
    )
}

export async function eventProjectLoader() {
    try {
        const response = await fetch('http://localhost:3000/projects');

        return await response.json();
    } catch (error) {

        throw new Response(JSON.stringify({error: true, message: `Fetch is failed ${error}`}));
    }
}