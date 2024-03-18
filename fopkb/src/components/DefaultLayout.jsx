import {Link, Navigate, Outlet} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../index.css"
import {useStateContext} from "../context/ContextProvider.jsx";
import Navbar from "react-bootstrap/Navbar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";
import bedas from "../assets/bedas.png"

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext();
  if (!token) {
    return <Navigate to="/login"/>
  }
  const onLogout = (ev) => {
    ev.preventDefault()
    axiosClient.post("/logout")
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUser(data)
      })
  }, [])

  return (
    <div>
      {/*#68b0ab*/}
      <Navbar expand="lg" className="pipnav" style={{paddingLeft:'1rem',paddingRight:'1rem',backgroundColor:'#125C61'}}>
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
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-5">
              <Link to="/home" className="nav-link">
                {/*<FontAwesomeIcon icon="home"/>*/}
                Dashboard</Link>
              {/*<NavDropdown title="Data 2019" id="basic-nav-dropdown">*/}
              {/*  <Link className="dropdown-item" to="">Pemilu 2019</Link>*/}
              {/*  <Link className="dropdown-item" to="">DPT 2019</Link>*/}
              {/*</NavDropdown>*/}
              {/*<Link to="/home" className="nav-link">Vefikasi Data</Link>*/}
              <NavDropdown title="Struktur" id="basic-nav-dropdown">
                <Link className="dropdown-item" to="/dpc">DPC</Link>
                <Link className="dropdown-item" to="/dpac">DPAC</Link>
                <Link className="dropdown-item" to="/dprt">DPRT</Link>
                <Link className="dropdown-item" to="/dpart">DPART</Link>
              </NavDropdown>
              <NavDropdown title="Program Unggulan" id="basic-nav-dropdown">
                <Link className="dropdown-item" to="">Insentif Guru Ngaji</Link>
                <Link className="dropdown-item" to="">Pinjaman Modal Bergulir</Link>
                <Link className="dropdown-item" to="">Insentif Linmas/RT/RW & PKK</Link>
                <Link className="dropdown-item" to="">Data Ruhtilahu</Link>
                <Link className="dropdown-item" to="">Insentif Ustad/Ustadzah/Takmir & Marbot</Link>
              </NavDropdown>
              <Link to="/pdkg" className="nav-link">Pendukung</Link>
              {/*<Link to="/home" className="nav-link">Caleg</Link>*/}
              <Link to="/saksi" className="nav-link">Saksi</Link>
              <Link to="/home" className="nav-link">Dokumentasi</Link>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title={user.nama} id="basic-nav-dropdown" className="justify-content-end">
                <NavDropdown.Item onClick={onLogout} href="#">
                  Ubah Data Account
                </NavDropdown.Item>
                <NavDropdown.Item onClick={onLogout} href="#">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        {/*</Container>*/}
      </Navbar>
      <main>
        <div className="content-wrapper" style={{margin:'0.3rem'}}>
          <Outlet/>
        </div>
      </main>
    </div>
  )
}
