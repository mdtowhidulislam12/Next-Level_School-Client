import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../LayOut/Layout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login/Login';
import Error from '../Pages/Error/Error';
import Register from '../Pages/Register/Register';
import Profile from '../Pages/Profile/Profile';
import Dashboard from '../Dashboard/Dashboard/Dashboard';
import PrivateRoute from '../PrivateRouter/PrivateRoute';

import About from '../Pages/About/About';
import Service from '../Pages/ServicesPage/Service';


const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout></Layout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/about',
                element:<PrivateRoute><About></About></PrivateRoute>
            },
            {
                path:'/service',
                element:<PrivateRoute><Service></Service></PrivateRoute>
            },
            {
                path:'/login',
                element:<Login></Login>    
            },
            {
                path:'/register',
                element:<Register></Register>    
            },
            {
                path:'/profile',
                element:<PrivateRoute><Profile></Profile> </PrivateRoute>  
            },
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:'/dashboard/addproduct',
                element:<PrivateRoute></PrivateRoute>
            },
            {
                path:'/dashboard/myproducts/email',
                element:<PrivateRoute></PrivateRoute>
            },
        ]

    },
    {
        path:'/admindashboard',
        element:<PrivateRoute></PrivateRoute>
    },
    {
        path:'*',
        element:<Error></Error>
    }
])


export default router;