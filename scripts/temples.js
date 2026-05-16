const yearElement = document.getElementById('currentyear');
const modifiedElement = document.getElementById('lastModified');

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

if (modifiedElement) {
    modifiedElement.textContent = document.lastModified;
}
