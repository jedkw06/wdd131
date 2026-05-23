const temperature = 12;
const windSpeed = 18;

function calculateWindChill(temp, speed) {
    return Math.round(35.74 + 0.6215 * temp - 35.75 * (speed ** 0.16) + 0.4275 * temp * (speed ** 0.16));
}

const temperatureElement = document.getElementById('temperature');
const windChillElement = document.getElementById('wind-chill');

if (temperatureElement) {
    temperatureElement.textContent = `${temperature}°C`;
}

if (temperature <= 10 && windSpeed > 4.8) {
    windChillElement.textContent = `${calculateWindChill(temperature, windSpeed)}°C`;
} else {
    windChillElement.textContent = 'N/A';
}

document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last updated: ${document.lastModified}`;