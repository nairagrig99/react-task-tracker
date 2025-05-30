import BurgerIcon from "../../UI/BurgerIcon.tsx";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../store";
import {action} from "../../store/store.slice.ts";

const Header = () => {

    const dispatch = useDispatch<AppDispatch>();
    const handleMenu = () => {
        dispatch(action.toggleMenu());
    }

    return (
        <header className="text-white  p-4 flex justify-between bg-[#353434]">

             <BurgerIcon handleMenu={handleMenu}/>

            <h1> header</h1>
        </header>
    )
}
export default Header;