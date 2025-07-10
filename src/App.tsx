import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import { generalStore} from "./store";
import HomePage, {createProjectHandler} from "./Pages/Home.tsx";
import RootLayout, {eventProjectLoader} from "./Pages/Root.tsx";
import ProjectPage, {taskAction} from "./Pages/Project.tsx";

function App() {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout/>,
            loader: eventProjectLoader,
            children: [
                {
                    path: 'home',
                    element: <HomePage/>,
                    action: createProjectHandler
                },
                {
                    path: ':id',
                    element: <ProjectPage/>,
                    action:taskAction
                },
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
