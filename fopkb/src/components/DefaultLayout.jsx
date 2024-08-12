import {Link, Navigate, Outlet} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import {useStateContext} from "../context/ContextProvider.jsx";
import Navbar from "react-bootstrap/Navbar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import axiosClient from "../axios-client.js";
import React, {useEffect, useState} from "react";
import bedas from "../assets/bedas.png"

export default function DefaultLayout() {
  const {userLogin, token, setUserLogin, setToken} = useStateContext();
  const [frSegm, setFrSegm] = useState([]);
  const [ndSegm, setNdSegm] = useState([]);
  if (!token) {
    return <Navigate to="/login"/>
  }
  const onLogout = (ev) => {
    ev.preventDefault()
    axiosClient.post("/logout")
      .then(() => {
        setUserLogin({})
        setToken(null)
      })
  }

  const frSeg = () => {
    axiosClient.get("/getSegFr").then(({data}) => {
      setFrSegm(data);
    })
  }
  const ndSeg = () => {
    axiosClient.get("/getDSegNd").then(({data}) => {
      setNdSegm(data);
    })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        localStorage.setItem("masukid",data.id)
        setUserLogin(data)
      })
    frSeg()
    ndSeg()
    // console.log(userLogin)
  }, [])

  return (
    <div>
      <Navbar expand="lg" className="pipnav"
              style={{paddingLeft: '1rem', paddingRight: '1rem', backgroundColor: '#125C61'}}>
        {/*<Container>*/}
        <Navbar.Brand>
          <img
            alt=""
            src={bedas}
            width="30"
            height="30"
            className="d-inline-block align-top"
          /> BEDAS
          {/*<Link to="/home" className="nav-link">BEDAS</Link>*/}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse key="navcol" id="basic-navbar-nav">
          <Nav className="ms-5" key="navms-5">
            <Link key="bernav" to="/home" className="nav-link">
              {/*<FontAwesomeIcon icon="home"/>*/}
              Dashboard</Link>
            {/*<NavDropdown key="stru" title="Struktur" id="basic-nav-dropdown dropdown-autoclose-true">*/}
            {/*  <Link className="dropdown-item" to="/dpc">DPC</Link>*/}
            {/*  <Link className="dropdown-item" to="/dpac">DPAC</Link>*/}
            {/*  <Link className="dropdown-item" to="/dprt">DPRT</Link>*/}
            {/*  <Link className="dropdown-item" to="/dpart">DPART</Link>*/}
            {/*</NavDropdown>*/}
            <NavDropdown key="ko" title="Kordinator" id="basic-nav-dropdown dropdown-autoclose-true">
              <Link key="KORCAM" className="dropdown-item" to="/korcam">KORCAM</Link>
              <Link key="KORDES" className="dropdown-item" to="/kordes">KORDES</Link>
              <Link key="KORRW" className="dropdown-item" to="/korrw">KORRW</Link>
              <Link key="KORTPS" className="dropdown-item" to="/kortps">KORTPS</Link>
            </NavDropdown>
            <NavDropdown key="segDrop" title="Segmen" id="basic-nav-dropdown">
              {frSegm.map(u => {
                if(u?.code_name){
                  let dataKirim={
                    labelparent:"",
                    label:u.lab,
                    segmen_id:u.nil,
                    subsegmen_id: "",
                    code_name:u.code_name
                  }
                  return(<Link key={u.nil+"navPar"} className="dropdown-item" state={dataKirim} to="/segmen">{u.lab}</Link>)
                }else{
                  return(
                    <>
                      <NavDropdown title={u.lab} key={u.nil+"navCh"}>
                        {
                          ndSegm.map(s=>{
                            if(u.nil===s.par){
                              let dataKirimsub={
                                labelparent:u.lab,
                                label:s.lab,
                                segmen_id:u.nil,
                                subsegmen_id:s.nil,
                                code_name:s.code_name
                              }
                              return (
                                <Link key={s.lab+s.lab+"navChIt"} className="dropdown-item" state={dataKirimsub} to="/segmen">{s.lab}</Link>
                              )
                            }
                          })
                        }
                      </NavDropdown>
                    </>
                  )
                }
              })}
            </NavDropdown>
            {/*<Link to="/pdkg" className="nav-link">Pendukung</Link>*/}
            {/*<Link to="/saksi" className="nav-link">Saksi</Link>*/}
            {/*<Link to="/home" className="nav-link">Dokumentasi</Link>*/}
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown key="usrpr" title={userLogin.nama} id="basic-nav-dropdown" className="justify-content-end">
              <NavDropdown.Item onClick={onLogout} href="#">
                Ubah Data Account
              </NavDropdown.Item>
              <NavDropdown.Item onClick={onLogout} href="#">
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main>
        <div className="content-wrapper" style={{margin: '0.3rem'}}>
          <Outlet/>
        </div>
      </main>
    </div>
  )
}
