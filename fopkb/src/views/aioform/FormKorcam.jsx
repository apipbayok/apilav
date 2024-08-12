import {useStateContext} from "../../context/ContextProvider.jsx";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {Card, CardBody, CardFooter, Col, Form, Row, Toast, ToastContainer} from "react-bootstrap";
import Button from "react-bootstrap/Button";

export default function FormKorcam() {
  const {userLogin, token, setUserLogin, setToken} = useStateContext();
  const [kecs, setKecs] = useState([]);
  const [desas, setDesas] = useState([]);
  const [segmensF, setSegmensF] = useState([]);
  const [segmensS, setSegmensS] = useState([]);

  const nav = useNavigate();
  let {id} = useParams();
  const resetdata = {
    id: null,
    nama: "",
    nik: "",
    alamat: "",
    jk: "L",
    tplahir: "",
    tgllahir: "",
    rt: 0,
    rw: 0,
    hp: "",
    notps: 0,
    kecamatan_id: 1,
    desa_id: 1,
    kawin: "TIDAK KAWIN",
    agama: "ISLAM",
    pekerjaan: "TIDAK BEKERJA",
    koor: "KORCAM",
    parent: 0,
    segmen_id: 0,
    subsegmen_id: 0
  }
  const [user, setUser] = useState(resetdata)

  const {setNotif} = useStateContext();

  const getSeg = () => {
    axiosClient.get("/getSegFr")
      .then(({data}) => {
        setSegmensF(data)
      })
  }
  const getSubSeg = (idsegPar) => {
    axiosClient.get(`/getSegNd/${idsegPar}`)
      .then(({data}) => {
        setSegmensS(data)
      })
  }

  if (id) {
    useEffect(() => {
      axiosClient.get(`/users/${id}`).then(({data}) => {
        setUser(data)
        getKecById()
        getDesaById()
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
      axiosClient.post(`/dptlskoo`, payload).then(({data}) => {
        setSuggestions(data);
      })
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    kecChangeHandle(suggestion.kecamatan_id, suggestion.dapil)
    setUser({...user, ...suggestion})
    setShowSuggestions(false);
  };


  const onSubmit = ev => {
    ev.preventDefault()
    // console.log(user);
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotif("Data diperbaharui")
          // nav('/users')
        }).catch(err => {
        console.log(err)
      })
    } else {
      // console.log(user);
      axiosClient.post("/daftar", user)
        .then(() => {
          setShow(true)
          setUser(resetdata)
        }).catch(err => {
          setShowGagal(true)
        console.log(err)
      })
    }
  }

  const getKec = () => {
    axiosClient.get("/lsKec")
      .then(({data}) => {
        setKecs(data)
      })
  }
  const getKecById = () => {
    axiosClient.get(`/lsKec/${user.kecamatan_id}`)
      .then(({data}) => {
        setKecs(data)
      })
  }
  const getDesa = () => {
    axiosClient.get(`/lsDesa/${user.kecamatan_id}`)
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
    setUser({...user, kecamatan_id: event});
    setUser({...user.dapil = dapilNo});
    axiosClient.get(`/lsDesa/${event}`)
      .then(({data}) => {
        setDesas(data)
      })
  }
  const segChangeHandle = (event) => {
    setUser({...user, segmen_id: event})
    getSubSeg(event)
    // console.log(user)
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        setUserLogin(data)
      })
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
      <h2>Form Data Kordinator Kecamatan</h2>
      <Form onSubmit={onSubmit} className="inline-form">
        <Row>
          <Col className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <Card>
              <CardBody>
                <Form.Group className="mb-3">
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
                  <Form.Control type="date" value={user.tgllahir}
                                onChange={(e) => setUser({...user, tgllahir: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control type="text" placeholder="Alamat" value={user.alamat}
                                onChange={(e) => setUser({...user, alamat: e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>RW/RT/TPS/HP</Form.Label>
                  <Row>
                    <Col><Form.Control value={user.rw} onChange={(e) => setUser({...user, rw: e.target.value})}
                                       type="number"
                                       placeholder="RW"/></Col>
                    <Col><Form.Control value={user.rt} onChange={(e) => setUser({...user, rt: e.target.value})}
                                       type="number"
                                       placeholder="RT"/></Col>
                    <Col><Form.Control value={user.notps} onChange={(e) => setUser({...user, notps: e.target.value})}
                                       type="number"
                                       placeholder="No. TPS"/></Col>
                    <Col><Form.Control required={true} value={user.hp}
                                       onChange={(e) => setUser({...user, hp: e.target.value})}
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
                <Form.Select aria-label="Default select" value={user.kecamatan_id}
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
                  <Form.Select aria-label="Default select" value={user.kawin}
                               onChange={(e) => setUser({...user, kawin: e.target.value})}>
                    {lsStKawin.map(u => (<option key={u.lab} value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Agama</Form.Label>
                  <Form.Select aria-label="Default select" value={user.agama}
                               onChange={(e) => {
                                 setUser({...user, agama: e.target.value})
                               }}>
                    {lsAgama.map(u => (<option key={u.lab} value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Pekerjaan</Form.Label>
                  <Form.Select aria-label="Default select" value={user.pekerjaan}
                               onChange={(e) => {
                                 setUser({...user, pekerjaan: e.target.value})
                               }}>
                    {lsPekerjaan.map(u => (<option key={u.lab} value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Segmen</Form.Label>
                  <Form.Select aria-label="Default select" value={user.segmen_id}
                               onChange={(e) => segChangeHandle(e.target.value)}>
                    <option value="0">Pilih Segmen</option>
                    {segmensF.map(u => (<option key={u.lab} value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Sub Segmen</Form.Label>
                  <Form.Select aria-label="Default select" value={user.subsegmen_id}
                               onChange={(e) => {
                                 setUser({...user, subsegmen_id: e.target.value})
                               }}>
                    <option value="0">Pilih SubSegmen</option>
                    {segmensS.map(u => (<option key={u.lab} value={u.nil}>{u.lab}</option>))}
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
