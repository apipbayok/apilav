import {Navigate, createBrowserRouter} from "react-router-dom";
import Login from "./views/Login/Login.jsx";
import Daftar from "./views/daftar/Daftar.jsx";
import Beranda from "./views/beranda/Beranda.jsx";
import Users from "./views/user/Users.jsx";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import UserForm from "./views/user/UserForm";
import Pendukung from "./views/pendukung/Pendukung";
import Pac from "./views/pac/Pac";
import Dpc from "./views/dpc/Dpc";
import Dpart from "./views/dpart/Dpart";
import Dprt from "./views/dprt/Dprt";
import Saksi from "./views/saksi/Saksi";
import Caleg from "./views/caleg/Caleg";

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
        path: "/users/",
        element: <Users/>
      },
      {
        path: "/pdkg/",
        element: <Pendukung/>
      },
      {
        path: "/dpac/",
        element: <Pac/>
      },
      {
        path: "/dpc/",
        element: <Dpc/>
      },
      {
        path: "/dpart/",
        element: <Dpart/>
      },
      {
        path: "/caleg/",
        element: <Caleg/>
      },
      {
        path: "/dprt/",
        element: <Dprt/>
      },
      {
        path: "/saksi/",
        element: <Saksi/>
      },
      {
        path: "/users/:id",
        element: <Users key="EditData"/>
      },
      {
        path: "/users/add/:tipe",
        element: <UserForm keys="tipe"/>
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
