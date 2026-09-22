const ISSURL='https://api.wheretheiss.at/v1/satellites/25544';
const ASTROURL = "https://late-tree-9626.stesting561.workers.dev?url=" + encodeURIComponent("http://api.open-notify.org/astros.json");

let isMetric = true;
function kmToMiles(km) {
    return (km * 0.621371).toFixed(2);
}
 
function showISS(data) {
    const alt=isMetric
    ? `${data.altitude.toFixed(2)} km`
    : `${kmToMiles(data.altitude)} mi`;

    const spd = isMetric
    ? `${data.velocity.toFixed(2)} km/h`
    : `${kmToMiles(data.velocity)} mph` ;

    document.getElementById('lat').textContent = data.latitude.toFixed(4);
    document.getElementById('lon').textContent = data.longitude.toFixed(4);
    document.getElementById('alt').textContent = alt;
    document.getElementById('speed').textContent = spd;

    const now = new Date();
    document.getElementById('update-time').textContent=`Last updated: ${now.toLocaleTimeString()}`;
}

function fetchISS() {
    fetch(ISSURL)
    .then(res => res.json())
    .then(data => showISS(data));
}

function fetchAstronauts (){
    fetch(ASTROURL)
        .then(res => res.json())
        .then(data => {
            document.getElementById('astro-count').textContent = `${data.number} people are currently in space.`;
            const list = document.getElementById('astro-list');
            list.innerHTML = '';
            data.people.forEach(person => {
                const li = document.createElement('li');
                li.textContent = `${person.name} - ${person.craft}`;
                list.appendChild(li);
            });
        })
        .catch(err=> {
            document.getElementById('astro-count').textContent = 'Could not load astronaut data';
            console.log(err);
        });
}

document.getElementById('unit-btn').addEventListener('click', () =>{
    isMetric= !isMetric;
    document.getElementById('unit-btn').textContent = isMetric ? 'Switch to Imperial' : 'Switch to Metric';
    fetchISS();
});

fetchISS();
fetchAstronauts();

setInterval(fetchISS,5000);