import {Link} from "react-router-dom";
import {Form, FormGroup, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faPencil, faTrash, faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate"
import React from "react";
import Button from "react-bootstrap/Button";

export default function Dpc() {
  const [users, setUsers] = useState([]);
  const [totdata, setTotdata] = useState(0);

  const [kecamatan, setKecamatan] = useState(0);
  const [desa, setDesa] = useState(0);
  const [kecs, setKecs] = useState([]);
  const [desas, setDesas] = useState([]);
  const [dapil, setDapil] = useState(0);
  const [linkurl, setLinkurl] = useState("DPC");

  const getDesa = () => {
    axiosClient.get(`/lsDesa/${kecamatan}`)
      .then(({data}) => {
        setDesas(data)
      })
  }

  const getKec = () => {
    axiosClient.get("/lsKec")
      .then(({data}) => {
        setKecs(data)
      })
  }

  const handlePageClick = (ev) => {
    let numb = eval(ev.selected + 1);
    if (linkurl === "usercari") {
      axiosClient.post(linkurl + `?page=${numb}`, payload).then(({data}) => {
        setUsers(data.data)
      })
    } else {
      axiosClient.get(`/user/` + linkurl + `?page=${numb}`).then(({data}) => {
        setUsers(data.data)
      })
    }
  }

  const payload = {
    kec: kecamatan,
    des: desa,
    dap: dapil,
    tipe: "DPC"
  }

  const getUsers = async () => {
    await axiosClient.get(`/user/DPC`).then(({data}) => {
      // console.log(data);
      setUsers(data.data);
      setTotdata(data.last_page);
    })
  }

  const onSubmit = ev => {
    ev.preventDefault()
    axiosClient.post(`/usercari`, payload)
      .then(({data}) => {
        setUsers(data.data);
        setTotdata(data.last_page);
        setLinkurl('usercari');
      }).catch(err => {
      console.log(err)
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
    getUsers();
    getKec();
    getDesa();
  }, [])

  return (
    <div className="container-fluid">
      <div className="col">
        <h3>DATA DPC</h3>
      </div>
      <Form onSubmit={onSubmit}>
        <Row>
          <div className="col-3">
            <FormGroup>
              <Form.Select aria-label="Default select" value={kecamatan}
                           onChange={(e) => kecChangeHandle(e.target.value)}>
                <option value="0">--Pilih Kecamatan--</option>
                {kecs.map(u => (<option value={u.nil}>{u.lab} - Dapil {u.dapil}</option>))}
              </Form.Select>
            </FormGroup>
          </div>
          <div className="col-3">
            <Form.Group>
              <Form.Select aria-label="Default select" value={desa} onChange={(e) => setDesa(e.target.value)}>
                <option value="0">--Pilih Desa--</option>
                {desas.map(u => (<option value={u.nil}>{u.lab}</option>))}
              </Form.Select>
            </Form.Group>
          </div>
          <div className="col-3">
            <Form.Select aria-label="Default select" value={dapil} onChange={(e) => setDapil(e.target.value)}>
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
            <Button className="btn btn-md btn-primary" type="submit"><FontAwesomeIcon icon={faSearch}/> Cari</Button>
            <button className="btn btn-success"><Link to="/users/add/DPC" className="nav-link">
              <FontAwesomeIcon icon={faPlus}/> Tambah Data
            </Link></button>
          </div>
        </Row>
      </Form>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>NO</th>
          <th>NAMA</th>
          <th>JK</th>
          <th>TEMPAT LAHIR</th>
          <th>TGL LAHIR</th>
          <th>ALAMAT</th>
          <th>KECAMATAN</th>
          <th>DESA</th>
          <th>RT/RW</th>
          <th>HP</th>
          <th>SEGMEN</th>
          <td></td>
        </tr>
        </thead>
        <tbody>
        {users.map((u, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{u.nama}</td>
            <td>{u.jk}</td>
            <td>{u.tplahir}</td>
            <td>{u.tglahir}</td>
            <td>{u.alamat}</td>
            <td>{u.kecamatan}</td>
            <td>{u.desa}</td>
            <td>{u.rt}/{u.rw}</td>
            <td>{u.hp}&nbsp;
              <Link to={"https://wa.me/" + u.hp.replace("0", "+62")} target="_blank">
                <FontAwesomeIcon icon={faWhatsapp}/>
              </Link>
            </td>
            <td>{u.seg_nama}</td>
            <td>
              <button className="btn btn-sm btn-warning" title="Ubah">
                <Link className="nav-link" to={'/users/' + {linkurl} + '/' + u.id}>
                  <FontAwesomeIcon icon={faPencil}/>
                </Link>
              </button>
              &nbsp;
              <button className="btn btn-sm btn-danger" title="Hapus">
                <FontAwesomeIcon icon={faTrash}/>
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        previousLabel="Prev"
        onPageChange={handlePageClick}
        containerClassName="pagconta"
        previousClassName="btn btn-md btn-outline-info tmb"
        nextClassName="btn btn-md btn-outline-info tmb"
        activeClassName="btn btn-md btn-primary tmb"
        disabledClassName="disabled tmb"
        nextLinkClassName=""
        pageLinkClassName="btn btn-md"
        pageCount={totdata}/>
    </div>
  )
}
