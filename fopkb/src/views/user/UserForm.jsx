import React, {useEffect, useState} from 'react';
import {Form, Row, Col, Card, CardBody, CardFooter} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import axiosClient from "../../axios-client.js";
import {useNavigate, useParams} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvider.jsx";

export default function UserForm() {
  const [kecs, setKecs] = useState([]);
  const [desas, setDesas] = useState([]);

  const nav = useNavigate();
  let {id} = useParams();
  let {tipe} = useParams();
  const [user, setUser] = useState({
    id: null, nik: "", nama: "", alamat: "",
    jk: "L", tplahir: "", tgllahir: "", agama: "", rt: 0, rw: 0,
    hp: "", notps: 0, kecamatan: 1, desa: 1, kawin: "TIDAK KAWIN", pekerjaan: "TIDAK BEKERJA", koor: "DPC",
  })
  const {setNotif} = useStateContext();

  if (id) {
    useEffect(() => {
      axiosClient.get(`/users/${id}`).then(({data}) => {
        setUser(data)
        getKecById()
        getDesaById()
      })
    })
  }

  const [nik, setNik] = useState();
  const [nama, setNama] = useState();
  const [alamat, setAlamat] = useState();
  const [jk, setJk] = useState();
  const [tplahir, setTplahir] = useState();
  const [tgllahir, setTgllahir] = useState();
  const [agama, setAgama] = useState();
  const [rt, setRt] = useState();
  const [rw, setRw] = useState();
  const [hp, setHp] = useState();
  const [notps, setNotps] = useState();
  const [kecamatan, setKecamatan] = useState(1);
  const [desa, setDesa] = useState(1);
  const [kawin, setKawin] = useState();
  const [pekerjaan, setPekerjaan] = useState();

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

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotif("Data diperbaharui")
          nav('/users')
        }).catch(err => {
        console.log(err)
      })
    } else {
      axiosClient.post("/users", user)
        .then(() => {
          console.log(user);
          setNotif("Data tersimpan")
          nav("/users")
        }).catch(err => {
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
    axiosClient.get(`/lsKec/${user.kecamatan}`)
      .then(({data}) => {
        setKecs(data)
      })
  }
  const getDesa = () => {
    axiosClient.get(`/lsDesa/${kecamatan}`)
      .then(({data}) => {
        setDesas(data)
      })
  }

  const getDesaById = () => {
    axiosClient.get(`/getDesa/${user.desa}`)
      .then(({data}) => {
        setDesas(data)
      })
  }
  const kecChangeHandle = (event) => {
    setKecamatan(event);
    axiosClient.get(`/lsDesa/${event}`)
      .then(({data}) => {
        setDesas(data)
        // setDesasld(data)
      })
  }

  useEffect(() => {
    getKec();
    getDesa();
  }, []);

  return (
    <div className="container-fluid">
      <h2>Form Data Pendukung</h2>
      <Form onSubmit={onSubmit} className="inline-form">
        <Row>
          <Col className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <Card>
              <CardBody>
                <Form.Group className="mb-3">
                  <Form.Label>NIK</Form.Label>
                  <Form.Control type="text" placeholder="NIK" value={nik} onChange={(e) => setNik(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control type="text" placeholder="Nama" value={nama} onChange={(e) => setNama(e.target.value)}/>
                </Form.Group>
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select aria-label="Default select" value={jk} onChange={(e) => setJk(e.target.value)}>
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </Form.Select>
                <Form.Group className="mb-3">
                  <Form.Label>Tempat Lahir</Form.Label>
                  <Form.Control type="text" placeholder="Tempat Lahir" value={tplahir}
                                onChange={(e) => setTplahir(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tanggal Lahir</Form.Label>
                  <Form.Control type="date" value={tgllahir} onChange={(e) => setTgllahir(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control type="text" placeholder="Alamat" value={alamat}
                                onChange={(e) => setAlamat(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>RT/RW/TPS/HP</Form.Label>
                  <Row>
                    <Col><Form.Control value={rt} onChange={(e) => setRt(e.target.value)} type="number"
                                       placeholder="RT"/></Col>
                    <Col><Form.Control value={rw} onChange={(e) => setRw(e.target.value)} type="number"
                                       placeholder="RW"/></Col>
                    <Col><Form.Control value={notps} onChange={(e) => setNotps(e.target.value)} type="number"
                                       placeholder="No. TPS"/></Col>
                    <Col><Form.Control value={hp} onChange={(e) => setHp(e.target.value)} type="text"
                                       placeholder="No.HP"/></Col> </Row>
                </Form.Group>
              </CardBody>
            </Card>
          </Col>
          <Col className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <Card>
              <CardBody>
                <Form.Label>Kecamatan</Form.Label>
                <Form.Select aria-label="Default select" value={kecamatan}
                             onChange={(e) => kecChangeHandle(e.target.value)}>
                  {kecs.map(u => (<option value={u.nil}>{u.lab}</option>))}
                </Form.Select>
                <Form.Group>
                  <Form.Label>Desa</Form.Label>
                  <Form.Select aria-label="Default select" value={desa} onChange={(e) => setDesa(e.target.value)}>
                    {desas.map(u => (<option value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status Perkawinan</Form.Label>
                  <Form.Select aria-label="Default select" value={kawin} onChange={(e) => setKawin(e.target.value)}>
                    {lsStKawin.map(u => (<option value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Agama</Form.Label>
                  <Form.Select aria-label="Default select" value={agama} onChange={(e) => setAgama(e.target.value)}>
                    {lsAgama.map(u => (<option value={u.nil}>{u.lab}</option>))}
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Pekerjaan</Form.Label>
                  <Form.Select aria-label="Default select" value={pekerjaan}
                               onChange={(e) => setPekerjaan(e.target.value)}>
                    {lsPekerjaan.map(u => (<option value={u.nil}>{u.lab}</option>))}
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

