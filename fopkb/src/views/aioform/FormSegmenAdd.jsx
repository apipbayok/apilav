import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Card, CardBody, CardFooter, ToastContainer, Toast} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axiosClient from "../../axios-client.js";
import {useParams, useLocation} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";


export default function FormSegmenAdd() {
  const {userLogin, token, setUserLogin, setToken} = useStateContext();
  const location = useLocation();
  const datambijage = location.state || {};
  const [kecs, setKecs] = useState([]);
  const [desas, setDesas] = useState([]);
  const [segmensF, setSegmensF] = useState([]);
  const [segmensS, setSegmensS] = useState([]);

  // const nav = useNavigate();
  let {id} = useParams();
  const dtxxx={
    segmen_id:datambijage.segmen_id,
    subsegmen_id:(datambijage.subsegmen_id==="")?datambijage.segmen_id:datambijage.subsegmen_id,
    created_by:localStorage.getItem("masukid")
  }

  const resetdata = {
    id: null,
    nik: "",
    nama: "",
    alamat: "",
    jk: "L",
    tplahir: "",
    tglahir: "",
    agama: "ISLAM",
    rt: 0,
    rw: 0,
    segmen_id: datambijage.segmen_id,
    subsegmen_id: (datambijage.subsegmen_id==="")?datambijage.segmen_id:datambijage.subsegmen_id,
    parent: "",
    created_by:localStorage.getItem("masukid"),
    dapil: 1,
    hp: "",
    tpsno: 0,
    kec_id: 1,
    desa_id: 1,
    stkawin: "TIDAK KAWIN",
    pekerjaan: "TIDAK BEKERJA"
  }
  const [user, setUser] = useState(resetdata)
  const {setNotif} = useStateContext();

  if (id) {
    useEffect(() => {
      axiosClient.get(`/users/${id}`).then(({data}) => {
        setUser(data)
        // getKecById()
        getDesaById()
        getSeg();
      })
    })
  }

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

  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [show, setShow] = useState(false);
  const [showGagal, setShowGagal] = useState(false);

  const handleInputChange = (e) => {
    setUser({...user, nik: e.target.value})
    let payload = {
      data: e.target.value
    }
    if (e.target.value.length > 8) {
      axiosClient.post(`/dptls`, payload).then(({data}) => {
        setSuggestions(data);
      })
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    kecChangeHandle(suggestion.kec_id, suggestion.dapil)
    setUser({...suggestion,...dtxxx})
    setShowSuggestions(false);
  };

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/segmen/${user.id}`, user)
        .then(() => {
          setNotif("Data diperbaharui")
        }).catch(err => {
        console.log(err)
      })
    } else {
      // console.log(user)
      axiosClient.post("/svSegmen", user)
        .then(() => {
          setShow(true)
          setUser(resetdata)
        }).catch(err => {
        console.log(err)
        setShowGagal(true)
      })
    }
  }

  const getKec = () => {
    axiosClient.get("/lsKec")
      .then(({data}) => {
        setKecs(data)
      })
  }
  const getSeg = () => {
    axiosClient.get("/getSegFr")
      .then(({data}) => {
        setSegmensF(data)
      })
  }
  // const getKecById = () => {
  //   axiosClient.get(`/lsKec/${user.kec_id}`)
  //     .then(({data}) => {
  //       setKecs(data)
  //     })
  // }
  const getDesa = () => {
    axiosClient.get(`/lsDesa/${user.kec_id}`)
      .then(({data}) => {
        setDesas(data)
      })
  }

  const getDesaById = () => {
    axiosClient.get(`/getDesa/${user.desa_id}`)
      .then(({data}) => {
        setDesas(data)
      })
  }
  const kecChangeHandle = (event, dapilNo) => {
    setUser({...user, kec_id: event});
    setUser({...user.dapil = dapilNo});
    axiosClient.get(`/lsDesa/${event}`)
      .then(({data}) => {
        setDesas(data)
      })
  }

  useEffect(() => {
    getKec();
    getDesa();
    getSeg();
  }, []);

  return (
    <div className="container-fluid">
      <Col xs={6}>
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
          <Toast onClose={() => setShow(false)} show={show} delay={4000} autohide>
            <Toast.Header className="bg-success">
              <strong className="me-auto">Sukses</strong>
            </Toast.Header>
            <Toast.Body>Data Kordinator Kecamatan Tersimpan</Toast.Body>
          </Toast>
        </ToastContainer>
        <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
          <Toast onClose={() => setShowGagal(false)} show={showGagal} delay={4000} autohide>
            <Toast.Header className="bg-danger">
              <strong className="me-auto">GAGAL!!!</strong>
            </Toast.Header>
            <Toast.Body>Terjadi Kesalahan</Toast.Body>
          </Toast>
        </ToastContainer>
      </Col>
      <h2>Form Data {datambijage.labelparent==""?datambijage.label:datambijage.labelparent+" ["+datambijage.label+"]"}</h2>
      <Form onSubmit={onSubmit} className="inline-form">
        <Row>
          <Col className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <Card>
              <CardBody>
                <Form.Group className="mb-3">
                  <Form.Control
                  type="hidden"
                  value={user.segmen_id}
                  />
                  <Form.Control
                    type="hidden"
                    value={user.subsegmen_id}
                  />
                  <Form.Label>NIK</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="NIK"
                    value={user.nik}
                    onChange={handleInputChange}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  {showSuggestions && (
                    <ul style={{listStyleType: "none"}}>
                      {suggestions.map((suggestion) => (
                        <li key={suggestion.nik} onClick={() => handleSelectSuggestion(suggestion)}>
                          {/*{console.log(suggestion)}*/}
                          {suggestion.nik + " - " + suggestion.nama}
                        </li>
                      ))}
                    </ul>
                  )}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control type="text" placeholder="Nama" value={user.nama}
                                onChange={(e) => setUser({...user, nama: e.target.value})}/>
                </Form.Group>
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select aria-label="Default select" value={user.jk}
                             onChange={(e) => setUser({...user, jk: e.target.value})}>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </Form.Select>
                <Form.Group className="mb-3">
                  <Form.Label>Tempat Lahir</Form.Label>
                  <Form.Control type="text" placeholder="Tempat Lahir" value={user.tplahir}
                                onChange={(e) => setUser({...user, tplahir: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control type="date" value={user.tglahir}
                                onChange={(e) => setUser({...user, tglahir: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control type="text" placeholder="Alamat" value={user.alamat}
                                onChange={(e) => setUser({...user, alamat: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>RT/RW/TPS/HP</Form.Label>
                  <Row>
                    <Col><Form.Control value={user.rt} onChange={(e) => setUser({...user, rt: e.target.value})}
                                       type="number"
                                       placeholder="RT"/></Col>
                    <Col><Form.Control value={user.rw} onChange={(e) => setUser({...user, rw: e.target.value})}
                                       type="number"
                                       placeholder="RW"/></Col>
                    <Col><Form.Control value={user.tpsno} onChange={(e) => setUser({...user, tpsno: e.target.value})}
                                       type="number"
                                       placeholder="No. TPS"/></Col>
                    <Col><Form.Control value={user.hp} onChange={(e) => setUser({...user, hp: e.target.value})}
                                       type="text"
                                       placeholder="No.HP"/></Col> </Row>
                </Form.Group>
              </CardBody>
            </Card>
          </Col>
          <Col className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <Card>
              <CardBody>
                <Form.Label>Kecamatan</Form.Label>
                <Form.Select aria-label="Default select" value={user.kecamatan}
                             onChange={(e) => kecChangeHandle(e.target.value, e.target[e.target.selectedIndex].getAttribute('data-dapil'))}>
                  {kecs.map(u => (<option key={u.lab} data-dapil={u.dapil} value={u.nil}>{u.lab}</option>))}
                </Form.Select>
                <Form.Group>
                  <Form.Label>Desa</Form.Label>
                  <Form.Select aria-label="Default select" value={user.desa_id}
                               onChange={(e) => setUser({...user, desa_id: e.target.value})}>
                    {desas.map(u => (<option key={u.lab + "Desa"} value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status Perkawinan</Form.Label>
                  <Form.Select aria-label="Default select" value={user.stkawin}
                               onChange={(e) => setUser({...user, stkawin: e.target.value})}>
                    {lsStKawin.map(u => (<option key={u.lab} value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Agama</Form.Label>
                  <Form.Select aria-label="Default select" value={user.agama}
                               onChange={(e) => setUser({...user, agama: e.target.value})}>
                    {lsAgama.map(u => (<option key={u.lab} value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Pekerjaan</Form.Label>
                  <Form.Select aria-label="Default select" value={user.pekerjaan}
                               onChange={(e) => setUser({...user, pekerjaan: e.target.value})}>
                    {lsPekerjaan.map(u => (<option key={u.lab} value={u.nil}>{u.lab}</option>))}
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
    </div>
  )
}

