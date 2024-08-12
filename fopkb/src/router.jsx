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
// import Caleg from "./views/caleg/Caleg";
import B3s from "./views/b3s/B3s.jsx"
// import Koalisi from "./views/koalisi/Koalisi.jsx";
import FormSegmenAdd from "./views/aioform/FormSegmenAdd.jsx";
import FormDataSegmen from "./views/aioform/FormDataSegmen.jsx";
import FormKorcam from "./views/aioform/FormKorcam.jsx";
import FormKordes from "./views/aioform/FormKordes.jsx";
import FormKorrw from "./views/aioform/FormKorrw.jsx";
import FormKortps from "./views/aioform/FormKortps.jsx";
import DataKorcam from "./views/dataaio/DataKorcam.jsx";
import DataKordes from "./views/dataaio/DataKordes.jsx";
import DataKorrw from "./views/dataaio/DataKorrw.jsx";
import DataKortps from "./views/dataaio/DataKortps.jsx";

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
      // {
      //   path: "/caleg/",
      //   element: <Caleg/>
      // },
      {
        path: "/dprt/",
        element: <Dprt/>
      },
      {
        path: "/saksi/",
        element: <Saksi/>
      },
      {
        path: "/b3s/",
        element: <B3s/>
      },
      // {
      //   path: "/koalisi/",
      //   element: <Koalisi/>
      // },
      {
        path: "/users/:id",
        element: <Users key="EditData"/>
      },
      {
        path: "/korcam/add",
        element: <FormKorcam/>
      }, {
        path: "/korcam",
        element: <DataKorcam/>
      },
      {
        path: "/kordes/add",
        element: <FormKordes/>
      },
      {
        path: "/kordes",
        element: <DataKordes/>
      },
      {
        path: "/korrw/add",
        element: <FormKorrw/>
      },
      {
        path: "/korrw",
        element: <DataKorrw/>
      },
      {
        path: "/kortps/add",
        element: <FormKortps/>
      },
      {
        path: "/kortps",
        element: <DataKortps/>
      },
      {
        path: "/users/add/:tipe",
        element: <UserForm keys="tipe"/>
      },
      {
        path: "/segmen",
        element: <FormDataSegmen/>
      },
      {
        path: "/segmen/add/:tipe",
        element: <FormSegmenAdd keys="tipe"/>
      },
      // {
      //   path: "/users/add",
      //   element: <UserForm/>
      // },
      {
        path: "/daftar",
        element: <Daftar/>
      },
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
      // {
      //   path: "/daftar",
      //   element: <Daftar/>
      // },
      // {
      //   path: "/users/add",
      //   element: <UserForm/>
      // },
    ]
  },

  {
    path: "*",
    element: <NotFound/>
  }
])

export default router;
