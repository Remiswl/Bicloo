'use strict';

var index = '';
var mymap;
var marker;

$('#stationsList').on('click', 'li', displayInfo);

function displayInfo(e) {
    // Masquer le paragraphe affiché au chargement de la page
    let intro = document.getElementById('starter');
    intro.classList.add('hide');

    // Récupérer le data-index du li sur lequel on a cliqué
    let element = e.target;

    index = element.getAttribute('data-index');

    // Récupérer la BDD
    let apiKey = '[APIkey to download on JCDecaux website]';
    let city = 'nantes';
    let url = `https://api.jcdecaux.com/vls/v1/stations?apiKey=${ apiKey }&contract=${ city}`;

    $.get(url, importDataOfEachStation);
}

function importDataOfEachStation(stations) {
    // Afficher les infos de la station dont la position dans l'objet 'stations' est égal à data-index
    let station = stations[index];

    // Afficher un message d'erreur si le status de la station n'est pas égale à "OPEN"
    let problem = document.getElementById('problem');

    if (station.status !== 'OPEN') {
        problem.classList.remove('hide');
    }

    // Afficher les détails
    // Définition des coordonnées et remise à zéro de la div de la carte
    let coordonnees = station.position;
    let latitude = coordonnees.lat;
    let longitude = coordonnees.lng;

    let displayDetail = document.getElementById('displayDetail');

    displayDetail.innerHTML = '';

    let detailsOfEachStation = `<h3>${ station.name }</h3>`;
    detailsOfEachStation = `${detailsOfEachStation }<p class="numberOfFreePlaces">Il reste <strong>${ station.available_bikes}`;

    if (station.available_bikes === 1) {
        detailsOfEachStation = `${detailsOfEachStation }</strong> vélo disponible </p>`;
    } else {
        detailsOfEachStation = `${detailsOfEachStation }</strong> vélos disponibles</p>`;
    }

    detailsOfEachStation = `${detailsOfEachStation }<h4>Addresse</h4>`;
    detailsOfEachStation = `${detailsOfEachStation }<p>${ station.address }</p>`;
    detailsOfEachStation = `${detailsOfEachStation }<h4>Nombre de places disponibles</h4>`;
    detailsOfEachStation = `${detailsOfEachStation }<p>${ station.available_bike_stands }</p>`;
    detailsOfEachStation = `${detailsOfEachStation }<h4>Localisation</h4>`;

    // Affichage des détails
    displayDetail.innerHTML = displayDetail.innerHTML + detailsOfEachStation;

    // Affichage de la carte
    let mapArea = document.getElementById('mapid');
    mapArea.classList.remove('hide');

    displayMap(latitude, longitude);
}

// Gestion de la carte
function displayMap(latitude, longitude) {
    if (mymap == null) {
        mymap = L.map('mapid').setView([ latitude, longitude ], 45);
        marker = L.marker([ latitude, longitude ]).addTo(mymap);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=[AccessToken to download on Mapbox website]', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: '[AccessToken to download on Mapbox website]'
        }).addTo(mymap);
    } else {
        mymap.panTo([ latitude, longitude ]);
        marker.setLatLng([ latitude, longitude ]);
    }
}
