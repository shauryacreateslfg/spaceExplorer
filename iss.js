const ISSURL='https://api.wheretheiss.at/v1/satellites/25544';
const ASTROURL='https://corsproxy.io/?https://open-notify.org/astros.json';

let isMetric = true;
function kmToMiles(km) {
    return (km * 0.621371).toFixed(2);
}
 
function showISS(data) {
    const alt=isMetric
    ? '${data.altitude.toFixed(2)} km'
    : '${kmToMiles(data.altitude)} mi';

    const spd = isMetric
    ? '${data.velocity.toFixed(2)} km/h'
    : '${kmToMiles(data.velocity)} mph' ;

    document.getElementById('lat').textContent = data.latitude.toFixed(4);
    document.getElementById('lon').textContent = data.longitude.toFixed(4);
    document.getElementById('alt').textContent = alt;
    document.getElementById('speed').textContent = spd;

    const now = new Date();
    document.getElementById('update-time').textContent='Last updated: ${now.toLocaleTimeString()}';
}
