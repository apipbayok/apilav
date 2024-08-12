import {Link} from "react-router-dom";
import {Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axiosClient from "../../axios-client.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWhatsapp} from "@fortawesome/free-brands-svg-icons";

export default function Saksi() {
  const [users, setUsers] = useState([]);
  const [hal,setHal]=useState(1);
  const [halTot,setHalTot]=useState([]);

  const getUserHal=()=>{
    axiosClient.get(`/user/Saksi?Page=${hal}`).then(({data}) => {
      setUsers(data.data)
    })
  }

  const handlePageChange=(pageNumber)=>{
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }


  const getUsers = () => {
    axiosClient.get(`/user/Saksi`).then(({data}) => {
      // console.log(data.data)
      setHalTot(data.last_page)
      setUsers(data.data)
    })
  }
  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="container-fluid">
      <Row>
        <div className="col">
          <h3>DATA SAKSI</h3>
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
            <td>{u.tglahir}</td>
            <td>{u.alamat}</td>
            <td>{u.kecamatan}</td>
            <td>{u.desa}</td>
            <td>{u.rt}/{u.rw}</td>
            <td>{u.hp}
              &nbsp;
            <Link to={"https://wa.me/"+u.hp.replace("0","+62")} target="_blank">
              <FontAwesomeIcon icon={faWhatsapp} />
            </Link>
              </td>
            <td>
              <button className="btn btn-sm btn-warning">
                <Link className="nav-link" to={'/users/Saksi/' + u.id}>Edit</Link>
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
