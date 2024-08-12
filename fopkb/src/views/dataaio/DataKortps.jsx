import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faPencil, faPlus, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../axios-client.js";
import {Form, FormGroup, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DataTable from "react-data-table-component";

export default function DataKortps() {
  const location = useLocation();
  const datambijage = location.state || {};

  const [users, setUsers] = useState([]);
  const [kecamatan, setKecamatan] = useState(0);
  const [desa, setDesa] = useState(0);
  const [kecs, setKecs] = useState([]);
  const [desas, setDesas] = useState([]);
  const [dapil, setDapil] = useState(0);
  const [linkurl, setLinkurl] = useState("DPC");

  const kolom = [
    // {name:"No", selector:row=>row.nama, sortable:true},
    { name: "Nama", selector: row => row.nama, sortable: true },
    { name: "JK", selector: row => row.jk },
    { name: "Tp Lahir", selector: row => row.tplahir },
    { name: "Tg Lahir", selector: row => row.tgllahir },
    { name: "Alamat", selector: row => row.alamat },
    { name: "Kecamatan", selector: row => row.kecamatanname, sortable: true },
    { name: "Desa", selector: row => row.desaname, sortable: true },
    { name: "RT/RW", selector: row => row.rt + "/" + row.rw },
    {
      name: "HP", cell: row => (
        <div>
          {row.hp}
          <Link to={"https://wa.me/" + row.hp.replace("0", "+62")} target="_blank">
            <FontAwesomeIcon icon={faWhatsapp} />
          </Link>
        </div>
      )
    },
    // {name:"Segmen", selector:row=>row.nama},
    // {
    //   name: "", cell: row => (
    //     <div>
    //       <button className="btn btn-sm btn-warning" title="Ubah">
    //         <Link className="nav-link" to={'/users/' + { linkurl } + '/' + row.pendukung_id}>
    //           <FontAwesomeIcon icon={faPencil} />
    //         </Link>
    //       </button>
    //       <button className="btn btn-sm btn-danger" title="Hapus">
    //         <Link className="nav-link" to={'/users/' + { linkurl } + '/' + row.pendukung_id}>
    //           <FontAwesomeIcon icon={faTrash} />
    //         </Link>
    //       </button>
    //     </div>
    //   )
    // },
  ]

  const getDesa = () => {
    axiosClient.get(`/lsDesa/${kecamatan}`)
      .then(({ data }) => {
        setDesas(data)
      })
  }

  const getKec = () => {
    axiosClient.get("/lsKec")
      .then(({ data }) => {
        setKecs(data)
      })
  }

  const payload = {
    kec_id: kecamatan,
    desa_id: desa,
    dapil: dapil,
    segmen_id: datambijage.nil
  }

  const getUsers = async () => {
    axiosClient.get(`/userko/KORTPS`).then(({data}) => {
      // console.log(data)
      setUsers(data)
    })
  }

  const onSubmit = ev => {
    ev.preventDefault()
    axiosClient.post(`/getseg`, payload)
      .then(({ data }) => {
        setUsers(data);
      }).catch(err => {
      console.log(err)
    })
  }

  const kecChangeHandle = (event) => {
    setKecamatan(event);
    axiosClient.get(`/lsDesa/${event}`)
      .then(({ data }) => {
        setDesas(data)
      })
  }

  useEffect(() => {
    getUsers();
    getKec();
    getDesa();
  }, [])

  return (
    <div className="container-fluid">
      <div className="col">
        <h3>Data Kordinator TPS</h3>
      </div>
      <Form onSubmit={onSubmit} style={{marginBottom:'2rem'}}>
        <Row>
          <div key="ct1" className="col-3">
            <FormGroup>
              <Form.Select key="kecls" aria-label="Default select" value={kecamatan}
                           onChange={(e) => kecChangeHandle(e.target.value)}>
                <option key="hu" value="0">--Pilih Kecamatan--</option>
                {kecs.map(u => (<option key={u.nil} value={u.nil}>{u.lab} - Dapil {u.dapil}</option>))}
              </Form.Select>
            </FormGroup>
          </div>
          <div key="ct2" className="col-3">
            <Form.Group>
              <Form.Select key="desals" aria-label="Default select" value={desa} onChange={(e) => setDesa(e.target.value)}>
                <option key="ha" value="0">--Pilih Desa--</option>
                {desas.map(u => (<option key={u.nil} value={u.nil}>{u.lab}</option>))}
              </Form.Select>
            </Form.Group>
          </div>
          <div key="ct3" className="col-3">
            <Form.Select key="dapills" aria-label="Default select" value={dapil} onChange={(e) => setDapil(e.target.value)}>
              <option value="0">--Pilih Dapil--</option>
              <option value="1">Dapil 1</option>
              <option value="2">Dapil 2</option>
              <option value="3">Dapil 3</option>
              <option value="4">Dapil 4</option>
              <option value="5">Dapil 5</option>
              <option value="6">Dapil 6</option>
              <option value="7">Dapil 7</option>
            </Form.Select>
          </div>
          <div className="col">
            <Button className="btn btn-md btn-primary" type="submit"><FontAwesomeIcon icon={faSearch} /> Cari</Button>
            <button className="btn btn-success"><Link state={datambijage} to={"/kortps/add"} className="nav-link">
              <FontAwesomeIcon icon={faPlus} /> Tambah Data
            </Link></button>
          </div>
        </Row>
      </Form>
      <DataTable
        columns={kolom}
        data={users}
        pagination
      />
    </div>
  )
}
