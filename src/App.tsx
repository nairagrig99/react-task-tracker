import './App.css'
import Header from "./Components/Header/Header.tsx";
import Menu from "./Components/Menu/Menu.tsx";
import Content from "./Components/Content/Content.tsx";

function App() {


    return (
        <>
            <div>
                <div>
                    <Header/>
                </div>
                <div className="flex">
                    <Menu/>
                    <Content/>
                </div>
            </div>
        </>
    )
}

export default App
