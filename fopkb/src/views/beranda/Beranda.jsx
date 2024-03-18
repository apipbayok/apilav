import Kartu from "../../Widgets/kartu";
import {Row} from "react-bootstrap";
import {Chart as ChartJS} from "chart.js/auto"
import {Bar, Doughnut, Pie} from "react-chartjs-2";
import axiosClient from "../../axios-client.js";
import {useEffect, useState} from "react";

export default function Beranda() {
  let nilDP = [];
  let labDP = [];
  const [dtaio, setDtaio] = useState([]);
  const [dttp, setDttp] = useState([]);
  const [nil, setNil] = useState([]);
  const [lab, setLab] = useState([]);
  const getTipe = () => {
    axiosClient.get(`/tipeuser`).then(({data}) => {
      setDttp(data)
    })
  }
  const getDtSTruk = () => {
     axiosClient.get(`/pdkgdap`).then(({data}) => {
      setDtaio(data)
    })
  }
  useEffect(() => {
    getDtSTruk();
    getTipe();
  }, [])
  return (
    <>
      <div className="dataCard customerCard align-items-center">
        <Row>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <h3>Data Struktur</h3>
            <div style={{width: "90%"}}>
              <Bar data={{
                labels: dttp.map(x=>x.koo),
                datasets: [
                  {
                    label: "",
                    data: dttp.map(x=>x.nil),
                    backgroundColor: [
                      "rgba(43,63,229,0.8)",
                      "rgba(250,192,19,0.8)",
                      "rgba(253,135,135,0.8)",
                      "rgba(240,63,229,0.8)"
                    ],
                    borderRadius: 5
                  }
                ]
              }}/>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <h3>Program Unggulan</h3>
            <div style={{width: "90%"}}>
              <Pie data={{
                labels: ["Insentif Guru Ngaji", "Pinjaman Modal Bergulir", "Insentif Linmas/RT/RW & PKK", "Data Ruhtilahu", "Insentif Ustad/Ustadzah/Takmir & Marbot"],
                datasets: [
                  {
                    label: "Program Unggulan",
                    data: [207, 207, 207, 207, 207]
                  }
                ]
              }}/>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <h3>Pedukung</h3>
            <div style={{width: "90%"}}>
              <Bar data={{
                labels: dtaio.map(x=>x.dap),
                datasets: [
                  {
                    label: "Pendukung",
                    data: dtaio.map(x=>x.nil),
                    backgroundColor: [
                      "rgba(43,63,229,0.8)",
                      "rgba(250,192,19,0.8)",
                      "rgba(253,135,135,0.8)",
                      "rgba(240,63,229,0.8)",
                      "rgba(0,100,0,0.8)",
                      "rgba(120,63,229,0.8)",
                      "rgba(204,255,51,0.8)",
                    ],
                    borderRadius: 5
                  }
                ]
              }}/>
            </div>
          </div>
        </Row>
      </div>
    </>
  )
}
