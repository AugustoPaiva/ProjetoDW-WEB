var map, heatmap;
var trafficViolations = [];

// window.onload =  function(){
//     getTrafficViolations();
//     console.log(trafficViolations);
    
// }
function getTrafficViolations(){
    var http =  new XMLHttpRequest();
    http.onreadystatechange =  function(){
        if(http.readyState == 4 && http.status == 200){
            trafficViolations = (JSON.parse(http.response)).TrafficViolations;
        }
    }
    http.open("GET", "trafficViolations.json", false);
    http.send();
}

async function initMap() {
    await getTrafficViolations();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 37.775, lng: -122.434},
        mapTypeId: 'satellite'
    });

    heatmap = new google.maps.visualization.HeatmapLayer({
        data: getPoints(),
        map: map
    });
}

function getPoints(){
    var retorno = [];
    trafficViolations.forEach(trafficViolation => {
        retorno.push(new google.maps.LatLng(trafficViolation.cord[0],trafficViolation.cord[1]))
    });
    return retorno;
}


