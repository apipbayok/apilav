import {Link, useParams} from "react-router-dom";
import {Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {isNull} from "lodash/lang.js";
import {upperCase} from "lodash/string.js";

export default function Users() {
  let {tipe} = useParams();
  if (tipe === "" || isNull(tipe)) {
    tipe = "Pendukung"
  }
  const [users, setUsers] = useState([]);
  // alert(tipe);
  const getUsers = () => {
    axiosClient.get(`/user/${tipe}`).then(({data}) => {
      setUsers(data)
    })
  }
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="container-fluid">
      <Row>
        <div className="col">
          <h3>DATA {upperCase(tipe)}</h3>
        </div>
        <div className="col-1">
          <button className="btn btn-success">Tambah Data</button>
        </div>
      </Row>
      <Table striped bordered hover>
        <thead>
        <tr>
          <td>NO</td>
          <td>NAMA</td>
          <td>JK</td>
          <td>TEMPAT LAHIR</td>
          <td>TGL LAHIR</td>
          <td>ALAMAT</td>
          <td>KECAMATAN</td>
          <td>DESA</td>
          <td>RT/RW</td>
          <td>HP</td>
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
            <td>{u.tgllahir}</td>
            <td>{u.alamat}</td>
            <td>{u.kecamatan}</td>
            <td>{u.desa}</td>
            <td>{u.rt}/{u.rw}</td>
            <td>{u.hp}</td>
            <td>
              <button className="btn btn-sm btn-warning">
                <Link className="nav-link" to={'/users/' + tipe + '/' + u.id}>Edit</Link>
              </button>
              &nbsp;
              <button className="btn btn-sm btn-danger">Hapus</button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  )
}
