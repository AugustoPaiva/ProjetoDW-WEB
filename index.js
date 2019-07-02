var map, heatmap;
var trafficViolations = [];
window.bairros = [];

window.onload = async function () {

    localStorage.setItem('bairros', []);
    localStorage.setItem('ano', '');
    await loadcanva();

};

document.getElementById('add').onclick = function () {
    //click me function!
    window.bairros.push(document.getElementById('bairro').value)
    document.getElementById('bairro').value = '';
    console.log(window.bairros);
}

document.getElementById('form').onsubmit = async function () {
    console.log('oi');
    localStorage.setItem('bairros', window.bairros);
    localStorage.setItem('ano', document.getElementById('ano').value);
    console.log(window.bairros);
    console.log(window.ano);
    //loadcanva();
}

async function initMap() {
    console.log(localStorage.getItem('bairros').split(','));
    await getTrafficViolations();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: { lat: -8.063172, lng: -34.871050 },
        mapTypeId: 'satellite'
    });
    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });
}

async function getTrafficViolations() {
    try {
        const bairros = localStorage.getItem('bairros').split(',');
        const ano = localStorage.getItem('ano');
        //const pontos = await axios.post('https://projeto-dw.herokuapp.com/api/infracoes', { 'ano': window.ano, 'bairro': window.bairros });
        const pontos = await axios.post('https://projeto-dw.herokuapp.com/api/infracoes', { 'ano': ano, 'bairro': bairros });
        //const pontos = await axios.post('https://projeto-dw.herokuapp.com/api/infracoes', { 'ano': window.ano, 'bairro': window.bairros });

        //const pontos = await axios.get('https://projeto-dw.herokuapp.com/api/infracoes', {});
        trafficViolations = pontos.data;


    } catch (e) {
        console.log(e);
    }

}

function getPoints() {
    var retorno = [];
    trafficViolations.forEach(trafficViolation => {
        for (const x of Array(trafficViolation.ocorrencias).keys()) {
            retorno.push(
                new google.maps.LatLng(trafficViolation.latitude, trafficViolation.longitude)
            );
        }

    });
    return retorno;
}

function loadcanva() {
    valorArrecadadoChart();
    qtdinfraChart();
    infraSemestre();
    tpInfraRecorrenteChart();
    picoInfraChart();
    pontosCarteiraChart();
}

//FEITO
async function valorArrecadadoChart() {
    let labels = [];
    let data = [];
    const bairros = localStorage.getItem('bairros').split(',');
    const ano = localStorage.getItem('ano');
    const valor = await axios.post('https://projeto-dw.herokuapp.com/api/valorMulta', { 'ano': ano, 'bairro': bairros });

    await valor.data[0].forEach(valor => { labels.push(valor.nome); data.push(parseInt(valor.total)) });
    var valorArrecadado = document.getElementById("valorArrecadado").getContext("2d");
    var myChart = new Chart(valorArrecadado, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Bairros",
                    data: data,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1
                }
            ]
        }
    });
}
async function qtdinfraChart() {
    //quantidadeInfracoes
    let labels = [];
    let data = [];
    const bairros = localStorage.getItem('bairros').split(',');
    const ano = localStorage.getItem('ano');
    const qtd = await axios.post('https://projeto-dw.herokuapp.com/api/quantidadeInfracoes', { 'ano': ano, 'bairro': bairros });

    await qtd.data.forEach(valor => { labels.push(valor.nome); data.push(parseInt(valor.quantidade)) });

    var qtdinfra = document.getElementById("qtdinfra").getContext("2d");
    var myChart = new Chart(qtdinfra, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Quantidade de infração",
                    data: data,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1
                }
            ]
        }
    });
}
async function infraSemestre() {
    let labels = [];
    let data = [];
    const bairros = localStorage.getItem('bairros').split(',');
    const ano = localStorage.getItem('ano');
    const retorno = await axios.post('https://projeto-dw.herokuapp.com/api/infraSemestre', { 'ano': ano, 'bairro': bairros });

    console.log(retorno.data);
    await retorno.data.forEach(valor => { labels.push(`${valor.ano_texto}/${valor.semestre_texto[valor.semestre_texto.length - 1]}`); data.push(parseInt(valor.quantidade)) });

    var infraSemestre = document.getElementById("infraSemestre").getContext("2d");
    var myChart = new Chart(infraSemestre, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "# of Votes",
                    data: data,
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
    let labels = [];
    let data = [];
    const bairros = localStorage.getItem('bairros').split(',');
    const ano = localStorage.getItem('ano');
    const infracao = await axios.post('https://projeto-dw.herokuapp.com/api/topInfracao', { 'ano': ano, 'bairro': bairros });
    await infracao.data.forEach(valor => { labels.push((valor.infracao_id + '-' + valor.descricao)); data.push(parseInt(valor.quantidade)) });

    var tpInfraRecorrente = document.getElementById("tpInfraRecorrente").getContext("2d");
    var myChart = new Chart(tpInfraRecorrente, {
        type: "polarArea",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "# of Votes",
                    data: data,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                    ],

                    borderWidth: 1
                }
            ]
        },
        options: {
            legend: {
                display: false
            }
        }
    });
}
async function picoInfraChart() {
    //horaPico
    let labels = [];
    let data = [];
    const bairros = localStorage.getItem('bairros').split(',');
    const ano = localStorage.getItem('ano');
    const horapico = await axios.post('https://projeto-dw.herokuapp.com/api/horaPico', { 'ano': ano, 'bairro': bairros });
    await horapico.data.forEach(valor => { labels.push(valor.hora + 'hr'); data.push(parseInt(valor.quantidade)) });

    var picoInfra = document.getElementById("picoInfra").getContext("2d");
    var myChart = new Chart(picoInfra, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Quantidade de infração",
                    data: data,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                    ],
                    borderWidth: 1
                }
            ]
        }
    });
}
async function pontosCarteiraChart() {
    let labels = [];
    let data = [];
    const bairros = localStorage.getItem('bairros').split(',');
    const ano = localStorage.getItem('ano');
    const pontosAplicados = await axios.post('https://projeto-dw.herokuapp.com/api/pontosAplicados', { 'ano': ano, 'bairro': bairros });
    await pontosAplicados.data.forEach(valor => {
        labels.push(valor.nome); data.push(parseInt(valor.media))
    });


    var pontosCarteira = document.getElementById("pontosCarteira").getContext("2d");
    var myChart = new Chart(pontosCarteira, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "# of Votes",
                    data: data,
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
