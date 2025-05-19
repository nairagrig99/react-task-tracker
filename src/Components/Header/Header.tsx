import BurgerIcon from "../../UI/BurgerIcon.tsx";

const Header = () => {

    const handleMenu = () => {

    }

    return (
        <header className="text-white  p-4 flex justify-between bg-[#353434]">
            <div>
                <button onClick={handleMenu}>
                    <BurgerIcon/>
                </button>
            </div>
            <h1> header</h1>
        </header>
    )
}
export default Header;