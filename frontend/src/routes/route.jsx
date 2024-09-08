import React, { useContext } from 'react';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import Home from '../pages/Home.jsx';
import Create from '../pages/Create.jsx';
import ErrorPage from '../ErrorPage.jsx';
import SignInForm from '../pages/LogInForm.jsx';
import SignUpForm from '../pages/SignUpForm.jsx';
import App from '../App.jsx';
import {AuthContext} from '../context/AuthContext.jsx';
import SingleRecipe from '../pages/SingleRecipe.jsx';

const Route = () => {

    let {user} = useContext(AuthContext)

    const router = createBrowserRouter([
        {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
            path: '/',
            element: user ? <Home/> : <Navigate to='/log-in'/>
            },
            {
            path: '/recipes/create',
            element: user ? <Create/> : <Navigate to='/log-in'/>
            },
            {
            path: '/recipes/edit/:id',
            element: user ? <Create/> : <Navigate to='/log-in'/>
            },
            {
                path: '/recipes/:title',
                element: user ? <SingleRecipe/> : <Navigate to="/log-in"/>
            },
            {
            path: '/log-in',
            element: !user ? <SignInForm/> : <Navigate to='/'/>
            },
            {
            path: "/sign-up",
            element: !user ? <SignUpForm/> : <Navigate to='/'/>
            }
            ]
        }
        ]
    )

    return (
        <RouterProvider router={router} />
    )
};

export default Route;