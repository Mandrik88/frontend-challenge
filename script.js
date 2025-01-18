// script.js
const API_URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const catGallery = document.getElementById('cat-gallery');
const allCatsBtn = document.getElementById('all-cats-btn');
const favsCatsBtn = document.getElementById('favs-cats-btn');

let favoriteCats = JSON.parse(localStorage.getItem('favoriteCats')) || [];

const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key": "DEMO-API-KEY"
  });
  
  var requestOptions = {
    method: 'GET',
    headers: headers,
    redirect: 'follow'
  };
  
  fetch("https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));        

// Получаем котиков
function fetchCats() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayCats(data);
        })
        .catch(error => {
            console.error('Ошибка при получении котиков:', error);
        });
}

// Функция для отображения котиков
function displayCats(cats) {
    catGallery.innerHTML = ''; // Очищаем галерею
    cats.forEach(cat => {
        const catCard = document.createElement('div');
        catCard.classList.add('cat-card');
        catCard.innerHTML = `
            <img src="${cat.url}" alt="Котик">
            <button class="fav-btn" data-id="${cat.id}">${isFavorite(cat.id) ? 'Убрать из любимых' : 'Добавить в любимые'}</button>
        `;
        catGallery.appendChild(catCard);
    });
    addFavBtnListeners();
}

// Проверка, есть ли котик в избранном
function isFavorite(id) {
    return favoriteCats.includes(id);
}

// Добавляем слушатели на кнопки "Избранное"
function addFavBtnListeners() {
    const favButtons = document.querySelectorAll('.fav-btn');
    favButtons.forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            if (isFavorite(id)) {
                favoriteCats = favoriteCats.filter(favId => favId !== id);
            } else {
                favoriteCats.push(id);
            }
            localStorage.setItem('favoriteCats', JSON.stringify(favoriteCats));
            displayCats([{ id, url: button.previousElementSibling.src }]); // Обновляем только этот котик
        });
    });
}

// Отображаем всех котиков по умолчанию
fetchCats();

// Переключение вкладок
allCatsBtn.addEventListener('click', fetchCats);
favsCatsBtn.addEventListener('click', () => {
    catGallery.innerHTML = ''; // Очищаем
    if (favoriteCats.length === 0) {
        catGallery.innerHTML = '<p>Нет избранных котиков.</p>';
        return;
    }
    favoriteCats.forEach(id => {
        const catCard = document.createElement('div');
        catCard.classList.add('cat-card');
        catCard.innerHTML = `
            <img src="https://cdn2.thecatapi.com/images/${id}.jpg" alt="Котик">
            <button class="fav-btn" data-id="${id}">Убрать из любимых</button>
        `;
        catGallery.appendChild(catCard);
    });
    addFavBtnListeners();
});