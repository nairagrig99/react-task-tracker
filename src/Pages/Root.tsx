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