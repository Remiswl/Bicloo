'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let display = document.getElementById('stationsList');
    let ul = document.createElement('ul');
    display.appendChild(ul);

    $.get('https://api.jcdecaux.com/vls/v1/stations?apiKey=b91888dba6ab242e1f13b377cb8b47b13aec62e0&contract=nantes', importData);

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
