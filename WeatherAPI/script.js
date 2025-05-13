let apiKey = "a784d7d1bcd6c60347bdc5de61f800f0";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let searchInput = document.querySelector('#searchInput');
let searchBtn = document.querySelector('#searchBtn');
let weatherImg = document.querySelector('#weatherImg');
let body = document.querySelector('body');
let card = document.querySelector('.card-body');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    const utc = new Date();
    const time = new Date(utc.getTime() + data.timezone * 1000);
    const hours = time.getHours();

    // Restructure the card layout
    card.innerHTML = `
        <div class="row">
            <div class="col-md-8">
                <h4 class="card-title mb-4">Weather in ${data.name}</h4>
                <p class="temperature mb-3"><strong>Temperature:</strong> ${Math.round(data.main.temp)}°C</p>
                <p class="humidity mb-3"><strong>Humidity:</strong> ${Math.round(data.main.humidity)}%</p>
                <p class="wind mb-3"><strong>Wind Speed:</strong> ${data.wind.speed} km/h</p>
                <p class="description mb-3"><strong>Description:</strong> ${data.weather[0].description}</p>
                <p class="time mb-3"><strong>Local Time:</strong> ${time.toLocaleTimeString()}</p>
            </div>
            <div class="col-md-4 d-flex align-items-center justify-content-center">
                <img src="" alt="Weather Icon" id="weatherImg" class="img-fluid">
            </div>
        </div>
    `;

    // Update weather image and add animations
    const weatherImg = document.querySelector('#weatherImg');
    if (data.weather[0].main == "Clouds") {
        weatherImg.src = 'images/clouds.png';
    } else if (data.weather[0].main == "Clear") {
        weatherImg.src = 'images/clear.png';
        addSunAnimation();
    } else if (data.weather[0].main == "Rain") {
        weatherImg.src = 'images/rain.png';
    } else if (data.weather[0].main == "Drizzle") {
        weatherImg.src = 'images/drizzle.png';
    } else if (data.weather[0].main == "Mist") {
        weatherImg.src = 'images/mist.png';
    } else if (data.weather[0].main == "Snow") {
        weatherImg.src = 'images/snow.png';
    }

    // Update background image based on time
    const imageByTime = {
        morning: 'morning.jpg',
        night: 'night.jpg',
        evening: 'evening.jpg',
        afternoon: 'afternoon.jpg',
    }

    let image;
    if (hours >= 0 && hours < 6) {
        image = imageByTime.night;
        addStarAnimation();
    } else if (hours >= 6 && hours < 12) {
        image = imageByTime.morning;
    } else if (hours >= 12 && hours < 18) {
        image = imageByTime.afternoon;
    } else {
        image = imageByTime.evening;
    }

    body.style.backgroundImage = `url('${image}')`;
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundAttachment = 'fixed';

    // Add wind animation if wind speed is significant
    if (data.wind.speed > 5) {
        addWindAnimation();
    }
}

function addSunAnimation() {
    const sun = document.createElement('div');
    sun.className = 'sun';
    sun.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 80px;
        height: 80px;
        background: yellow;
        border-radius: 50%;
        box-shadow: 0 0 20px yellow;
        animation: pulse 2s infinite alternate;
    `;
    document.body.appendChild(sun);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            100% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);
}

function addStarAnimation() {
    const starContainer = document.createElement('div');
    starContainer.className = 'star-container';
    starContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    `;
    document.body.appendChild(starContainer);

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 2 + 1}s infinite alternate;
        `;
        starContainer.appendChild(star);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0% { opacity: 0.2; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function addWindAnimation() {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: url('images/leaf.png') no-repeat center/cover;
        animation: blowLeaf 10s linear infinite;
    `;
    document.body.appendChild(leaf);

    const tree = document.createElement('div');
    tree.className = 'tree';
    tree.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 50px;
        width: 100px;
        height: 200px;
        background: url('images/tree.png') no-repeat center/cover;
        animation: sway 5s ease-in-out infinite;
    `;
    document.body.appendChild(tree);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes blowLeaf {
            0% { left: -20px; top: 50%; transform: rotate(0deg); }
            100% { left: 100%; top: 20%; transform: rotate(720deg); }
        }
        @keyframes sway {
            0%, 100% { transform: rotate(0deg); }
            50% { transform: rotate(5deg); }
        }
    `;
    document.head.appendChild(style);
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(searchInput.value);
    }
});
