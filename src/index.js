
import '../pages/index.css'; 

const API_URL = "https://api.thecatapi.com/v1/images/search?limit=10";
const catGallery = document.getElementById('cat-gallery');
const allCatsBtn = document.getElementById('all-cats-btn');
const favsCatsBtn = document.getElementById('favs-cats-btn');
const loading = document.querySelector('.loading');

let favoriteCats = JSON.parse(localStorage.getItem('favoriteCats')) || [];
let allCatsData = []; // Для хранения всех полученных котиков


//Получаем котиков
function fetchCats() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            allCatsData = data; // Сохраняем всех котиков в переменной
            displayCats(allCatsData); // Отображаем всех котиков по умолчанию
        })
        .catch(error => {
            console.error('Ошибка при получении котиков:', error);
        });
}
// Функция для отображения котиков
function displayCats(cats) {
    catGallery.innerHTML = ''; // Очищаем галерею
    cats.forEach(cat => {
        createElementShowPhoto({ url: cat.url, id: cat.id, icon: favoriteCats.includes(cat.id) ? "fa-solid" : "fa-regular" });
    });
}

// Функция для создания элемента с фотографией котика и иконкой лайка
function createElementShowPhoto({ url, id, icon = "fa-regular" }) {
    const photoItem = document.createElement("div");
    photoItem.classList.add("photo-container__item");
    photoItem.innerHTML = `
        <img src="${url}" alt="${id}"></img>
        <i class="${icon} fa-heart photo-container__icon"></i>
    `;
    
    // Добавляем обработчик события клика на область с фотографией
    photoItem.addEventListener("click", (e) => likeCat(id, e));

    catGallery.appendChild(photoItem);
}

// Функция для обработки клика по иконке лайка
function likeCat(id, event) {
    const iconElement = event.currentTarget.querySelector("i");
    if (favoriteCats.includes(id)) {
        // Если котик уже в избранном, убираем его
        favoriteCats = favoriteCats.filter(favId => favId !== id);
        iconElement.className = "fa-regular fa-heart"; // Меняем стиль на неселектированный
    } else {
        // Если котика нет в избранном, добавляем
        favoriteCats.push(id);
        iconElement.className = "fa-solid fa-heart"; // Меняем стиль на селектированный
    }
    localStorage.setItem('favoriteCats', JSON.stringify(favoriteCats)); // Сохраняем изменения в localStorage
}
// Функции для переключения между котиками
function showAllCats() {
    displayCats(allCatsData); // Отображаем всех котиков
}

//Функция отображения любимых котиков
function showFavoriteCats() {
    const favoriteData = allCatsData.filter(cat => favoriteCats.includes(cat.id));

    displayCats(favoriteData); // Отображаем только любимых котиков
}
// Инициализация
fetchCats();

// Функция для выбора вкладки понравившихся котиков
function selectFavoriteCats() {
    allCatsBtn.classList.remove("active"); // Убираем активный класс с кнопки всех котиков
    favsCatsBtn.classList.add("active"); // Добавляем активный класс на кнопку с любимыми котиками
    
    // Скрываем элемент с загрузкой, если он задан
    loading.classList.add('loading_hidden'); 

    // Проверяем наличие любимых котиков
    if (favoriteCats.length === 0) {
        catGallery.innerHTML = "<h1>Пока ничего нет(((</h1>"; // Сообщение, если нет любимых котиков
    } else {
        showFavoriteCats(); // Вызываем функцию для отображения любимых котиков
    }
}

// Обработчик события для кнопки с любимыми котиками
favsCatsBtn.addEventListener('click', selectFavoriteCats);

// Обработчики событий для кнопок
allCatsBtn.addEventListener('click', showAllCats);
favsCatsBtn.addEventListener('click', showFavoriteCats);

