'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let display = document.getElementById('stationsList');
    let ul = document.createElement('ul');
    display.appendChild(ul);

    $.get('https://api.jcdecaux.com/vls/v1/stations?apiKey=[APIkey to download on JCDecaux website]&contract=nantes', importData);

    function importData(stations) {
        let index = 0;

        for (let station of stations) {
            let li = document.createElement('li');

            li.setAttribute('data-index', index);

            index++;

            li.innerHTML = `${li.innerHTML }<i class="fas fa-bicycle"></i>${ station.address}`;

            ul.appendChild(li);
        }
    }
});
