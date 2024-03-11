import {Navigate, createBrowserRouter} from "react-router-dom";
import Login from "./views/Login/Login.jsx";
import Daftar from "./views/daftar/Daftar.jsx";
import Beranda from "./views/beranda/Beranda.jsx";
import Users from "./views/user/Users.jsx";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import UserForm from "./views/user/UserForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout/>,
    children: [
      {
        path: "/",
        element: <Navigate to="/home"/>
      },
      {
        path: "/home",
        element: <Beranda/>
      },
      {
        path: "/users/:tipe",
        element: <Users key="tipe"/>
      },{
        path: "/users/:tipe/:id",
        element: <Users key="EditData"/>
      },
      {
        path: "/users/add",
        element: <UserForm/>
      },
      // {
      //   path:"/daftar",
      //   element:<Daftar/>
      // },
    ]
  },
  {
    path: "/",
    element: <GuestLayout/>,
    children: [
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/daftar",
        element: <Daftar/>
      },
      {
        path: "/users/add",
        element: <UserForm/>
      },
    ]
  },

  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
