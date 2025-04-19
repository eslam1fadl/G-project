import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Components/Home';
import About from './Components/About';
import Login from './Components/Login';
import Register from './Components/Register';
import NotFound from './Components/NotFound';
import Schedule from './Components/Schedule';
import ProfileUser from './Components/ProfileUser';
import ProfileDoctor from './Components/ProfileDoctor';
import ChangePassword from './Components/ChangePassword';
import Contact from './Components/Contact';
import Addclinic from './Components/Addclinic';
import ShowMyClinic from './Components/ShowMyClinic';
import UpdateClinic from './Components/UpdateClinic';


import AdminLayout from './Components/Admin/AdminLayout';
import Doctors from './Components/Admin/Doctors';
import AddDoctors from './Components/Admin/AddDoctors';

import Addcity from './Components/Admin/Addcity';

import Users from './Components/Admin/Users';
import Chats from './Components/Admin/Chats';
import General from './Components/Admin/General';
import ForgetPassword from './Components/ForgetPassword';
import ProtectedRoute from './Components/ProtectedRoute';


export default function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'changepassword', element: <ChangePassword /> },
        { path: 'forgetpassword', element: <ForgetPassword /> },
        {
          element: <ProtectedRoute />, 
          children: [
            { path: 'about', element: <About /> },
            { path: 'schedule', element: <Schedule /> },
            { path: 'profileDoctor', element: <ProfileDoctor /> },
            { path: 'profileUser', element: <ProfileUser /> },
            { path: 'contact', element: <Contact /> },
            { path: 'Addclinic', element: <Addclinic /> },
            { path: 'ShowMyClinic', element: <ShowMyClinic /> },
            { path: 'UpdateClinic', element: <UpdateClinic /> },

            {
              path: 'admin',
              element: <AdminLayout />,
              children: [
                { path: '', element: <General /> },
                { path: 'chats', element: <Chats /> },
                { path: 'users', element: <Users /> },
                { path: 'doctors', element: <Doctors /> },
                { path: 'AddDoctors', element: <AddDoctors /> },
                { path: 'Addcity', element: <Addcity /> },

              ],
            },
          ],
        },

        { path: '*', element: <NotFound /> }, 
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
