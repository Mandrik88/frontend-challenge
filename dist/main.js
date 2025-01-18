/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ \"./pages/index.css\");\n\nvar API_URL = \"https://api.thecatapi.com/v1/images/search?limit=10\";\nvar catGallery = document.getElementById('cat-gallery');\nvar allCatsBtn = document.getElementById('all-cats-btn');\nvar favsCatsBtn = document.getElementById('favs-cats-btn');\nvar loading = document.querySelector('.loading');\nvar favoriteCats = JSON.parse(localStorage.getItem('favoriteCats')) || [];\nvar allCatsData = []; // Для хранения всех полученных котиков\n\n//Получаем котиков\nfunction fetchCats() {\n  fetch(API_URL).then(function (response) {\n    if (!response.ok) {\n      throw new Error('Network response was not ok ' + response.statusText);\n    }\n    return response.json();\n  }).then(function (data) {\n    allCatsData = data; // Сохраняем всех котиков в переменной\n    displayCats(allCatsData); // Отображаем всех котиков по умолчанию\n  }).catch(function (error) {\n    console.error('Ошибка при получении котиков:', error);\n  });\n}\n// Функция для отображения котиков\nfunction displayCats(cats) {\n  catGallery.innerHTML = ''; // Очищаем галерею\n  cats.forEach(function (cat) {\n    createElementShowPhoto({\n      url: cat.url,\n      id: cat.id,\n      icon: favoriteCats.includes(cat.id) ? \"fa-solid\" : \"fa-regular\"\n    });\n  });\n}\n\n// Функция для создания элемента с фотографией котика и иконкой лайка\nfunction createElementShowPhoto(_ref) {\n  var url = _ref.url,\n    id = _ref.id,\n    _ref$icon = _ref.icon,\n    icon = _ref$icon === void 0 ? \"fa-regular\" : _ref$icon;\n  var photoItem = document.createElement(\"div\");\n  photoItem.classList.add(\"photo-container__item\");\n  photoItem.innerHTML = \"\\n        <img src=\\\"\".concat(url, \"\\\" alt=\\\"\").concat(id, \"\\\"></img>\\n        <i class=\\\"\").concat(icon, \" fa-heart photo-container__icon\\\"></i>\\n    \");\n\n  // Добавляем обработчик события клика на область с фотографией\n  photoItem.addEventListener(\"click\", function (e) {\n    return likeCat(id, e);\n  });\n  catGallery.appendChild(photoItem);\n}\n\n// Функция для обработки клика по иконке лайка\nfunction likeCat(id, event) {\n  var iconElement = event.currentTarget.querySelector(\"i\");\n  if (favoriteCats.includes(id)) {\n    // Если котик уже в избранном, убираем его\n    favoriteCats = favoriteCats.filter(function (favId) {\n      return favId !== id;\n    });\n    iconElement.className = \"fa-regular fa-heart\"; // Меняем стиль на неселектированный\n  } else {\n    // Если котика нет в избранном, добавляем\n    favoriteCats.push(id);\n    iconElement.className = \"fa-solid fa-heart\"; // Меняем стиль на селектированный\n  }\n  localStorage.setItem('favoriteCats', JSON.stringify(favoriteCats)); // Сохраняем изменения в localStorage\n}\n// Функции для переключения между котиками\nfunction showAllCats() {\n  displayCats(allCatsData); // Отображаем всех котиков\n}\n\n//Функция отображения любимых котиков\nfunction showFavoriteCats() {\n  var favoriteData = allCatsData.filter(function (cat) {\n    return favoriteCats.includes(cat.id);\n  });\n  displayCats(favoriteData); // Отображаем только любимых котиков\n}\n// Инициализация\nfetchCats();\n\n// Функция для выбора вкладки понравившихся котиков\nfunction selectFavoriteCats() {\n  allCatsBtn.classList.remove(\"active\"); // Убираем активный класс с кнопки всех котиков\n  favsCatsBtn.classList.add(\"active\"); // Добавляем активный класс на кнопку с любимыми котиками\n\n  // Скрываем элемент с загрузкой, если он задан\n  loading.classList.add('loading_hidden');\n\n  // Проверяем наличие любимых котиков\n  if (favoriteCats.length === 0) {\n    catGallery.innerHTML = \"<h1>Пока ничего нет(((</h1>\"; // Сообщение, если нет любимых котиков\n  } else {\n    showFavoriteCats(); // Вызываем функцию для отображения любимых котиков\n  }\n}\n\n// Обработчик события для кнопки с любимыми котиками\nfavsCatsBtn.addEventListener('click', selectFavoriteCats);\n\n// Обработчики событий для кнопок\nallCatsBtn.addEventListener('click', showAllCats);\nfavsCatsBtn.addEventListener('click', showFavoriteCats);\n\n//# sourceURL=webpack://frontend-challenge/./src/index.js?");

/***/ }),

/***/ "./pages/index.css":
/*!*************************!*\
  !*** ./pages/index.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://frontend-challenge/./pages/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;