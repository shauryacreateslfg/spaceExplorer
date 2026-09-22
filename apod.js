const BASEURL = '/.netlify/functions/apod';

function showAPOD(data) {
    document.getElementById('apod-title').textContent = data.title;
    document.getElementById('apod-date').textContent = data.date;
    document.getElementById('apod-desc').textContent = data.explanation;

    const img = document.getElementById('apod-img');
    const video = document.getElementById('apod-video');

    if (data.media_type === 'video') {
        img.hidden = true;
        video.hidden = false;
        video.src = data.url;
    } else {
        video.hidden = true;
        img.hidden = false;
        img.src = data.url;
    }
}

function loadToday() {
    fetch(BASEURL)
        .then(res => res.json())
        .then(data => showAPOD(data))
        .catch(err => console.error(err));
}

function loadrandom() {
    const start = new Date(1995, 5, 16);
    const end = new Date();
    const random = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    const date = random.toISOString().split('T')[0];
    fetch(`${BASEURL}?date=${date}`)
        .then(res => res.json())
        .then(data => showAPOD(data))
        .catch(err => console.error(err));
}

function startCountdown() {
    setInterval(() => {
        const now = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0,0,0,0);
        const diff = tomorrow - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        document.getElementById('timer').textContent =
            `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
}

document.getElementById('random-btn').addEventListener('click', loadrandom);
loadToday();
startCountdown();