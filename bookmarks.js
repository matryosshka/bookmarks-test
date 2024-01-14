/*
(!) Cовременные браузеры запрещают добавление закладок через JavaScript по соображениям безопасности: решение - предложить пользователю нажать: "CTRL+D"

- Метод window.sidebar.addPanel() для Firefox больше не поддерживается и не будет работать 
в новых версиях браузера.

- Метод window.external.AddFavorite() для Internet Explorer также устарел (работает до 8 версии),
а в Edge уже не поддерживается.
*/


/* Так, как методы работали в очень старых версиях браузеров, можно на мобильных и десктопах просто выводить подсказки:*/

let addToFavorite = document.getElementById('add-to-favorite');
let isMobile = window.matchMedia("only screen and (max-width: 768px)").matches;

// Функция для вывода сообщения на десктопе
function desktopMessage() {
  alert('Нажмите: Ctrl+D на клавиатуре, чтобы добавить эту страницу в закладки');
}

// Функция для вывода сообщения на мобильном устройстве
function mobileMessage() {
  alert('Чтобы добавить эту страницу в избранное, нажмите на значок "Меню ( ⫶ )" и выберите "Добавить в избранное"');
}

// Обработчик клика на кнопке
addToFavorite.addEventListener('click', function () {
  // Проверяем, является ли устройство мобильным
  if (isMobile) {
    // Если да, выводим сообщение для мобильных устройств
    mobileMessage();
  } else {
    // Если нет, выводим сообщение для десктопов
    desktopMessage();
  }
});

window.addEventListener('orientationchange', () => {
  location.reload();
});


/* --------------------------------------------------------------------------------- */


/* А тут, версия с описанием методов для старых браузеров, устаревшие*/

let addToFavorites = document.getElementById('add-to-favorites');
let title = document.title;
let url = window.location.href;
let isMobiles = window.matchMedia("only screen and (max-width: 768px)").matches;

function desktopMessages() {
  alert('Нажмите: Ctrl+D на клавиатуре, чтобы добавить эту страницу в закладки');
}

function desktopNewMessage() {
  alert('Нажмите: ' + (navigator.userAgent.toLowerCase().indexOf("Safari") > - 1 ? 'Command/Cmd' : 'CTRL') + '+D на клавиатуре, чтобы добавить эту страницу в закладки');
}

function mobileMessages() {
  alert('Чтобы добавить эту страницу в избранное, нажмите на значок "Меню ( ⫶ )" и выберите "Добавить в избранное"');
}

addToFavorites.addEventListener('click', function () {

  // Google Chrome, Safari, Microsoft Edge и Я.Браузер
  if (navigator.userAgent.indexOf("Chrome") > -1 || navigator.userAgent.indexOf("Safari") > -1 ||
    navigator.userAgent.indexOf("Edg") > -1 || navigator.userAgent.indexOf("YaBrowser") > -1) {
    desktopNewMessage();

    // Mozilla Firefox (работает только на старых версиях)
  } else if (navigator.userAgent.indexOf("Firefox") > -1) {

    try {
      window.sidebar.addPanel(title, url, "");
    } catch (e) {
      desktopMessages();
    }

    // IE (работает только на старых версиях)
  } else if (navigator.userAgent.indexOf('MSIE') > -1 || navigator.userAgent.indexOf('Trident/') > -1) {
    try {
      window.external.AddFavorite(url, title);
    } catch (e) {
      desktopMessages();
    }

    // Opera (работает только на старых версиях)
  } else if (navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR') > -1 || typeof (opera) == "object") {
    try {
      a.rel = "sidebar";
      a.title = title;
      a.url = url;
      a.href = url;
      return true;
    } catch (e) {
      desktopMessages();
    }

    // Для мобильных браузеров: Chrome, Safari, Edge, Opera, Firefox

    // } else if (isMobile || /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
    //   (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform)) || navigator.userAgent.toLowerCase().match(/(ipad|iphone)/)) {
    //   alert('Чтобы добавить эту страницу в избранное, нажмите на значок "Меню ( ⫶ )" и выберите "Добавить в избранное"');

  } else if (isMobiles) { // тут на мобильных: все равно выводится alert для десктопов: разбираюсь
    mobileMessages();

  } else {
    // В ином случае
    desktopMessages();
  }

  return false;
});