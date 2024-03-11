import Kartu from "../../Widgets/kartu";
import {Row} from "react-bootstrap";
import {Chart as ChartJS} from "chart.js/auto"
import {Bar, Doughnut,Pie} from "react-chartjs-2";

export default function Beranda(){
    return (
    <>
      <div className="dataCard customerCard align-items-center">
        <Row>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <h3>Data Struktur</h3>
            <div style={{width:"90%"}}>
              <Bar data={{
                labels:["DPC","PAC","DPRT","DPART"],
                datasets:[
                  {

                    label:"Data Struktur",
                    data:[207,207,207,207],
                    backgroundColor:[
                      "rgba(43,63,229,0.8)",
                      "rgba(250,192,19,0.8)",
                      "rgba(253,135,135,0.8)",
                      "rgba(240,63,229,0.8)"
                    ],
                    borderRadius:5
                  }
                ]
              }}/>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <h3>Program Unggulan</h3>
            <div style={{width:"90%"}}>
              <Pie data={{
                labels:["Insentif Guru Ngaji","Pinjaman Modal Bergulir","Insentif Linmas/RT/RW & PKK","Data Ruhtilahu","Insentif Ustad/Ustadzah/Takmir & Marbot"],
                datasets:[
                  {
                    label:"Program Unggulan",
                    data:[207,207,207,207,207]
                  }
                ]
              }}/>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
              <Kartu nilai="3.014.338" backgr="info" judul="Jumlah DPT Pemilu 2019"/>
          </div>
        </Row>
      </div>
    </>
    )
}
