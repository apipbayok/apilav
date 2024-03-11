import Form from "react-bootstrap/Form";
// import "../Login/login.css";
import Button from "react-bootstrap/Button";
import {createHashRouter, Link} from "react-router-dom";
import axiosClient from "../../axios-client.js";
import {useStateContext} from "../../context/ContextProvider.jsx";
import React, {useEffect, createRef, useState} from "react";
import {Card, CardBody, CardFooter, Col, Row} from "react-bootstrap";

export default function Daftar() {
  const [kecld, setKecld] = useState([]);
  const [desasld, setDesasld] = useState([]);
  const nikRef = createRef();
  const namaRef = createRef();
  const alamatRef = createRef();
  const [jks, setJks] = useState("L");
  const tplahirRef = createRef();
  const tgllahirRef = createRef();
  const rtRef = createRef();
  const rwRef = createRef();
  const hpRef = createRef();
  const notpsRef = createRef();
  const [agamas, setAgamas] = useState("ISLAM");
  const [kecamatans, setKecamatans] = useState(1);
  const [desas, setDesas] = useState(1);
  const [kawins, setKawins] = useState("TIDAK KAWIN");
  const [pekerjaans, setPekerjaans] = useState("TIDAK BEKERJA");
  const [koors, setKoors] = useState("DPC");
  // const passwordRef = createRef();
  // const passwordConfirmationRef = createRef();
  const lsAgama = [
    {nil: "ISLAM", lab: "ISLAM"},
    {nil: "KATHOLIK", lab: "KATHOLIK"},
    {nil: "PROTESTAN", lab: "PROTESTAN"},
    {nil: "HINDU", lab: "HINDU"},
    {nil: "BUDHA", lab: "BUDHA"},
    {nil: "KHONGHUCU", lab: "KHONGHUCU"},
  ]
  const lsStKawin = [
    {nil: "TIDAK KAWIN", lab: "TIDAK KAWIN"},
    {nil: "KAWIN", lab: "KAWIN"},
    {nil: "JANDA", lab: "JANDA"},
    {nil: "DUDA", lab: "DUDA"},
    {nil: "JANDA MATI", lab: "JANDA MATI"},
    {nil: "DUDA MATI", lab: "DUDA MATI"},
  ]
  const lsPekerjaan = [
    {nil: "TIDAK BEKERJA", lab: "TIDAK BEKERJA"},
    {nil: "IBU RUMAH TANGGA", lab: "IBU RUMAH TANGGA"},
    {nil: "PNS", lab: "PNS"},
    {nil: "PNS GURU", lab: "PNS GURU"},
    {nil: "GURU HONORER", lab: "GURU HONORER"},
    {nil: "PETUGAS KESEHATAN", lab: "PETUGAS KESEHATAN"},
    {nil: "BURUH", lab: "BURUH"},
    {nil: "BURUH HARIAN LEPAS", lab: "BURUH HARIAN LEPAS"},
    {nil: "PETANI", lab: "PETANI"},
    {nil: "PEDAGANG", lab: "PEDAGANG"},
    {nil: "GURU NGAJI", lab: "GURU NGAJI"},
    {nil: "MARBOT", lab: "MARBOT"},
    {nil: "PARANORMAL", lab: "PARANORMAL"},
    {nil: "KARYAWAN SWASTA", lab: "KARYAWAN SWASTA"},
    {nil: "WIRASWASTA", lab: "WIRASWASTA"},
    {nil: "TNI", lab: "TNI"},
    {nil: "PELAJAR", lab: "PELAJAR"},
  ]

  const getKec = () => {
    axiosClient.get("/lsKec")
      .then(({data}) => {
        setKecld(data)
      })
  }
  const getKecById = () => {
    axiosClient.get(`/lsKec/${kecamatans}`)
      .then(({data}) => {
        setKecld(data)
      })
  }
  const getDesa = () => {
    axiosClient.get(`/lsDesa/${kecamatans}`)
      .then(({data}) => {
        setDesasld(data)
      })
  }

  const getDesaById = () => {
    axiosClient.get(`/getDesa/${desas}`)
      .then(({data}) => {
        setDesasld(data)
      })
  }

  const kecChangeHandle = (event) => {
    setKecamatans(event);
    axiosClient.get(`/lsDesa/${event}`)
      .then(({data}) => {
        setDesas(data[0]['nil'])
        setDesasld(data)
      })
  }

  useEffect(() => {
    getKec();
    getDesa();
    // getDesaById();
  }, []);

  // const {setUser, setToken} = useStateContext()

  const onSubmit = (ev) => {
    ev.preventDefault()
    const payload = {
      nik: nikRef.current.value,
      nama: namaRef.current.value,
      alamat: alamatRef.current.value,
      jk: jks,
      tplahir: tplahirRef.current.value,
      tgllahir: tgllahirRef.current.value,
      agama: agamas,
      rt: rtRef.current.value,
      rw: rwRef.current.value,
      hp: hpRef.current.value,
      notps: notpsRef.current.value,
      kecamatan: kecamatans,
      desa: desas,
      kawin: kawins,
      pekerjaan: pekerjaans,
      koor: koors

    }
    console.log(payload);
    axiosClient.post('/daftar', payload).then(({data}) => {
      // setToken(data.token)
      // setUser(data.user)
    }).catch(error => {
      const res = error.response;
      if (res && res.status === 422) {
        console.log(res.data.errors);
      }
    })
  }

  return (
    // <div className="login-page">
    <div className="container-fluid">
      <Form onSubmit={onSubmit} className="inline-form">
        <Row>
          <Col className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <Card>
              <CardBody>
                <Form.Group className="mb-3">
                  <Form.Label>NIK</Form.Label>
                  <Form.Control type="text" placeholder="NIK" ref={nikRef}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control type="text" placeholder="Nama" ref={namaRef}/>
                </Form.Group>
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select aria-label="Default select" value={jks} onChange={(e) => setJks(e.target.value)}>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </Form.Select>
                <Form.Group className="mb-3">
                  <Form.Label>Tempat Lahir</Form.Label>
                  <Form.Control type="text" placeholder="Tempat Lahir" ref={tplahirRef}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control type="date" ref={tgllahirRef}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control type="text" placeholder="Alamat" ref={alamatRef}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>RT/RW/TPS/HP</Form.Label>
                  <Row>
                    <Col><Form.Control ref={rtRef} type="number"
                                       placeholder="RT"/></Col>
                    <Col><Form.Control ref={rwRef} type="number"
                                       placeholder="RW"/></Col>
                    <Col><Form.Control ref={notpsRef} type="number"
                                       placeholder="No. TPS"/></Col>
                    <Col><Form.Control ref={hpRef} type="text"
                                       placeholder="No.HP"/></Col> </Row>
                </Form.Group>
              </CardBody>
            </Card>
          </Col>
          <Col className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <Card>
              <CardBody>
                <Form.Label>Kecamatan</Form.Label>
                <Form.Select aria-label="Default select" value={kecamatans}
                             onChange={(e) => kecChangeHandle(e.target.value)}>
                  {kecld.map(u => (<option value={u.nil}>{u.lab}</option>))}
                </Form.Select>
                <Form.Group>
                  <Form.Label>Desa</Form.Label>
                  <Form.Select aria-label="Default select" value={desas} onChange={(e) => setDesas(e.target.value)}>
                    {desasld.map(u => (<option value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status Perkawinan</Form.Label>
                  <Form.Select aria-label="Default select" value={kawins} onChange={(e) => setKawins(e.target.value)}>
                    {lsStKawin.map(u => (<option value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Agama</Form.Label>
                  <Form.Select aria-label="Default select" value={agamas} onChange={(e) => setAgamas(e.target.value)}>
                    {lsAgama.map(u => (<option value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Pekerjaan</Form.Label>
                  <Form.Select aria-label="Default select" value={pekerjaans}
                               onChange={(e) => setPekerjaans(e.target.value)}>
                    {lsPekerjaan.map(u => (<option value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Struktur</Form.Label>
                  <Form.Select aria-label="Default select" value={koors} onChange={(e) => setKoors(e.target.value)}>
                    <option value="DPC">DPC</option>
                    <option value="PAC">PAC</option>
                    <option value="DPRT">DPRT</option>
                    <option value="DPART">DPART</option>
                    <option value="KORTPS">KORTPS</option>
                  </Form.Select>
                </Form.Group>
              </CardBody>
              <CardFooter>
                <Form.Group className="mb-3 float-end">
                  <Button type="submit">Simpan</Button>
                </Form.Group>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Form>
      {/*</div>*/}
      {/*<div className="form">*/}
      {/*  <h1>Daftar</h1>*/}
      {/*  <form className="register-form" onSubmit={onSubmit}>*/}
      {/*    <Form.Group className="mb-3">*/}
      {/*      <Form.Control ref={emailRef} type="email" placeholder="Email"/>*/}
      {/*    </Form.Group>*/}
      {/*    <Form.Group className="mb-3">*/}
      {/*      <Form.Control ref={nameRef} type="text" placeholder="Nama"/>*/}
      {/*    </Form.Group>*/}
      {/*    <Form.Group className="mb-3">*/}
      {/*      <Form.Control ref={passwordRef} type="password" placeholder="Password"/>*/}
      {/*    </Form.Group>*/}
      {/*    <Form.Group className="mb-3">*/}
      {/*      <Form.Control ref={passwordConfirmationRef} type="password" placeholder="Konfirmasi Password"/>*/}
      {/*    </Form.Group>*/}
      {/*    <Button variant="primary" type="submit">*/}
      {/*      Daftar*/}
      {/*    </Button>*/}
      {/*    <p className="message">Sudah Terdaftar? <Link to="/login">Login</Link></p>*/}
      {/*  </form>*/}
      {/*</div>*/}
    </div>
  )
}
