import Kartu from "../../Widgets/kartu";
import {Row} from "react-bootstrap";
import {Chart as ChartJS} from "chart.js/auto"
import {Bar, Doughnut, Pie} from "react-chartjs-2";
import axiosClient from "../../axios-client.js";
import {useEffect, useState} from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {Chart} from "chart.js";

Chart.register(ChartDataLabels);

export default function Beranda() {
  let nilDP = [];
  let labDP = [];
  // const [dtaio, setDtaio] = useState([]);
  // const [dttp, setDttp] = useState([]);
  const [alldpt, setAlldpt] = useState([]);
  const [struk, setStruk] = useState([]);
  const [usia, setUsia] = useState([]);
  const [segmen, setSegmen] = useState([]);
  const [nil, setNil] = useState([]);
  const [lab, setLab] = useState([]);
  // const getTipe = () => {
  //   axiosClient.get(`/tipeuser`).then(({data}) => {
  //     setDttp(data)
  //   })
  // }
  const getStruktur = () => {
    axiosClient.get(`/getStruk`).then(({data}) => {
      setStruk(data)
    })
  }

  const allDPT = () => {
    axiosClient.get(`/alldpt`).then(({data}) => {
      setAlldpt(data)
    })
  }

  const getUsiaDpt = () => {
    axiosClient.get('/usiadpt').then(({data}) => {
      setUsia(data)
      // console.log(usia.at(1))
    })
  }

  const options = {
    plugins: {
      datalabels: {
        display: true,
        color: '#000',
        anchor: 'center',
        align: 'center',
        maintainAspectRatio:false,
        rotation:-90,
        formatter: (value) => {
          return Intl.NumberFormat('en-DE').format(value);
        },
        font: {
          weight: 'bold',
        },
      },
      legend: {
        display: false, // Hides the legend
      },
    },
  };
  // const getDtSTruk = () => {
  //   axiosClient.get(`/pdkgdap`).then(({data}) => {
  //     setDtaio(data)
  //   })
  // }
  const getSegmen = () => {
    axiosClient.get(`/getsegmen`).then(({data}) => {
      // console.log(data)
      setSegmen(data)
    })
  }
  useEffect(() => {
    // getDtSTruk();
    // getTipe();
    getStruktur();
    getUsiaDpt();
    allDPT();
    getSegmen();
  }, [])
  return (
    <>
      <div className="dataCard customerCard align-items-center">
        <Row>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <h3>Data Struktur</h3>
            <div style={{width: "90%"}}>
              <Bar data={{
                labels: struk.map(x => x.koor),
                datasets: [
                  {
                    label: "",
                    data: struk.map(x => x.nil),
                    backgroundColor: [
                      "rgba(43,63,229,0.8)",
                      "rgba(250,192,19,0.8)",
                      "rgba(253,135,135,0.8)",
                      "rgba(240,63,229,0.8)"
                    ],
                    borderRadius: 5
                  }
                ]
              }} options={options}/>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <h3>DPT</h3>
            <div style={{width: "90%"}}>
              <Bar data={{
                labels: alldpt.map(x => "Dapil "+x.dapil),
                datasets: [
                  {
                    label: "DPT",
                    data: alldpt.map(x => x.alldpt),
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
              }} options={options}/>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <h3>Usia DPT</h3>
            <div style={{width: "90%"}}>
              <Bar data={{
                labels: usia.map(x => "Usia " + x.age_name),
                datasets: [
                  {
                    data: usia.map(x => x.age_qty),
                    backgroundColor: [
                      "rgba(43,63,229,0.8)",
                      "rgba(250,192,19,0.8)",
                      "rgba(253,135,135,0.8)",
                      "rgba(240,63,229,0.8)",
                      "rgba(0,100,0,0.8)",
                    ],
                    borderRadius: 5
                  }
                ]
              }} options={{
                plugins: {
                  datalabels: {
                    display: true,
                    color: '#000',
                    anchor: 'end',
                    align: 'top',
                    formatter: (value) => {
                      return Intl.NumberFormat('en-DE').format(value);
                    },
                    font: {
                      weight: 'bold',
                    },
                  },
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      footer: function (tooltipItems) {
                        return tooltipItems.map((tooltipItem) => {
                          const index = tooltipItem.dataIndex;
                          const additionalInfo = usia.at(index).age_desk;
                          return additionalInfo;
                        });
                      },
                    },
                  },
                }
              }}/>
            </div>
          </div>
        </Row>
        <Row>
          {/*<div className="col-lg-3 col-md-6 col-xs-12">*/}
          {/*  <h3>Pendukung</h3>*/}
            {/*<div style={{width: "95%"}}>*/}
            {/*  <Bar data={{*/}
            {/*    labels: dtaio.map(x => x.dap),*/}
            {/*    datasets: [*/}
            {/*      {*/}
            {/*        label: "Pendukung",*/}
            {/*        data: dtaio.map(x => x.nil),*/}
            {/*        backgroundColor: [*/}
            {/*          "rgba(43,63,229,0.8)",*/}
            {/*          "rgba(250,192,19,0.8)",*/}
            {/*          "rgba(253,135,135,0.8)",*/}
            {/*          "rgba(240,63,229,0.8)",*/}
            {/*          "rgba(0,100,0,0.8)",*/}
            {/*          "rgba(120,63,229,0.8)",*/}
            {/*          "rgba(204,255,51,0.8)",*/}
            {/*        ],*/}
            {/*        borderRadius: 5*/}
            {/*      }*/}
            {/*    ]*/}
            {/*  }} options={options}/>*/}
            {/*</div>*/}
          {/*</div>*/}
          <div className="col">
            <h3>Data Pendukung</h3>
            {/*<div style={{width: "100%",maxHeight:"400px"}}>*/}
            <div>
              <Bar height="80px"
                data={{
                labels: segmen.map(x => x.seg_nama),
                datasets: [
                  {
                    label: "",
                    data: segmen.map(x => x.hit),
                    backgroundColor: [
                      "rgba(43,63,229,0.8)",
                      "rgba(250,192,19,0.8)",
                      "rgba(253,135,135,0.8)",
                      "rgba(240,63,229,0.8)"
                    ],
                    borderRadius: 5
                  }
                ]
              }} options={options}/>
            </div>
          </div>
        </Row>
      </div>
    </>
  )
}
