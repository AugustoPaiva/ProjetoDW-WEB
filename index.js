var map, heatmap;
var trafficViolations = [];

window.onload = function () {
    loadcanva();
};



async function initMap() {
    await getTrafficViolations();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 37.775, lng: -122.434 },
        mapTypeId: 'satellite'
    });
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });
}

function getTrafficViolations() {

    // console.log(xhr)
    // if (!xhr) {
    //     throw new Error('CORS not supported');
    // }
    axios.get('https://projeto-dw.herokuapp.com/api/infracoes', {})
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        });

    // var http = new XMLHttpRequest();

    // console.log('oi')
    // http.onreadystatechange = function () {
    //     if (http.readyState == 4 && http.status == 200) {
    //         trafficViolations = JSON.parse(http.response);
    //         console.log(http.response);
    //     }
    // };
    // http.open("GET", "localhost:3001/api/infracoes", true);
    // http.send();


}

function getPoints() {
    var retorno = [];
    trafficViolations.forEach(trafficViolation => {
        retorno.push(
            new google.maps.LatLng(trafficViolation.cord[0], trafficViolation.cord[1])
        );
    });
    return retorno;
}

function loadcanva() {
    valorArrecadadoChart();
    qtdinfraChart();
    qqq();
    tpInfraRecorrenteChart();
    picoInfraChart();
    pontosCarteiraChart();
}
function valorArrecadadoChart() {
    var valorArrecadado = document.getElementById("valorArrecadado").getContext("2d");
    var myChart = new Chart(valorArrecadado, {
        type: "pie",
        data: {
            labels: ["2015", "2016", "2017", "2018", "2019", "Orange"],
            datasets: [
                {
                    label: "# of Votes",
                    data: [1000, 2505, 6596, 3262, 3362, 3363],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        }
    });
}
function qtdinfraChart() {
    var qtdinfra = document.getElementById("qtdinfra").getContext("2d");
    var myChart = new Chart(qtdinfra, {
        type: "line",
        data: {
            labels: ["2015", "2016", "2017", "2018", "2019", "Orange"],
            datasets: [
                {
                    label: "# of Votes",
                    data: [1000, 2505, 6596, 3262, 3362, 3363],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        }
    });
}
function qqq() {
    var qqq = document.getElementById("qqq").getContext("2d");
    var myChart = new Chart(qqq, {
        type: "bar",
        data: {
            labels: ["2015", "2016", "2017", "2018", "2019", "Orange"],
            datasets: [
                {
                    label: "# of Votes",
                    data: [1000, 2505, 6596, 3262, 3362, 3363],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        }
    });
}
async function tpInfraRecorrenteChart() {
    // var json = {};
    // var http = await new XMLHttpRequest();
    // http.onreadystatechange = await function () {
    //     if (http.readyState == 4 && http.status == 200) {
    //         json = JSON.parse(http.response);
    //     }
    // };
    // console.log(json);
    // http.open("GET", "http://localhost:3001/api/topInfracao", false);
    // http.send();

    var tpInfraRecorrente = document.getElementById("tpInfraRecorrente").getContext("2d");
    var myChart = new Chart(tpInfraRecorrente, {
        type: "polarArea",
        data: {
            labels: ["2015", "2016", "2017", "2018", "2019", "Orange"],
            datasets: [
                {
                    label: "# of Votes",
                    data: [1000, 2505, 6596, 3262, 3362, 3363],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        }
    });
}
function picoInfraChart() {
    var picoInfra = document.getElementById("picoInfra").getContext("2d");
    var myChart = new Chart(picoInfra, {
        type: "radar",
        data: {
            labels: ["2015", "2016", "2017", "2018", "2019", "Orange"],
            datasets: [
                {
                    label: "# of Votes",
                    data: [1000, 2505, 6596, 3262, 3362, 3363],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        }
    });
}
function pontosCarteiraChart() {
    var pontosCarteira = document.getElementById("pontosCarteira").getContext("2d");
    var myChart = new Chart(pontosCarteira, {
        type: "pie",
        data: {
            labels: ["2015", "2016", "2017", "2018", "2019", "Orange"],
            datasets: [
                {
                    label: "# of Votes",
                    data: [1000, 2505, 6596, 3262, 3362, 3363],
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)"
                    ],
                    borderWidth: 1
                }
            ]
        }
    });
}
