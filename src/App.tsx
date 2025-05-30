import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {generalStore} from "./store";
import HomePage from "./Pages/Home.tsx";
import RootLayout from "./Pages/Root.tsx";


function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            children: [
                {path: 'home', element: <HomePage/>}
            ]
        }
    ]);

    return (
        <>
            <Provider store={generalStore}>
                <RouterProvider router={router}/>
            </Provider>
        </>
    )
}

export default App
