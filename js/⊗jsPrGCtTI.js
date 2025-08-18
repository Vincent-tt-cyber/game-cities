document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector(".start-button");
  const finishButton = document.querySelector(".finish-button");
  const message = document.querySelector(".message");

  let cities = [];
  isFirstStart = true;
  let currentPlayer = 1;

  // Старт игры
  startButton.addEventListener("click", initGame);

  function initGame() {
    // Скрываем кнопку
    startButton.style.display = "none";

    // Скрываем описание
    let gameInfo = document.querySelectorAll(".game-info p");
    gameInfo.forEach((item) => {
      item.style.display = "none";
    });

    // Показываем поле ввода
    let cityInput = document.querySelector(".city-input");
    cityInput.style.display = "block";

    let currentPlayerElem = document.querySelector(".current-player");
    currentPlayerElem.style.display = "block";

    // Вывод сообщения
    if (cities.length === 0 && isFirstStart) {
      message.textContent = "Введите название города";
      message.style.display = "block";
      isFirstStart = false;
      cityInput.focus();
    }

    // Обработка клавиши
    cityInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        // Получение города
        let city = cityInput.value;

        let endWord = checkWordCityName(city);

        // Вывод сообщения для игрока
        message.innerHTML = `Игрок ${currentPlayer} ввел город: <b>${
          city[0].toUpperCase() + city.slice(1)
        }</b>. Введите город начинающийся с последней буквы <b></p>${endWord[
          endWord.length - 1
        ].toUpperCase()}</b>`;

        // Добавление города в массив
        addCity(city);

        cityInput.value = "";
        cityInput.focus();

        currentPlayerElem.textContent = `Вводит: Игрок ${currentPlayer}`;
      }
    });

    function addCity(cityName) {
      // Первая буква в верхний регистр
      let city = cityName[0].toUpperCase() + cityName.slice(1);

      // Проверка имеется ли такой же город в массиве
      let isCityExists = cities.some((item) => item.name == city);

      let endWord = checkWordCityName(city);

      // Добавления города в массив
      if (!isCityExists) {
        cities.push({
          name: city,
          player: currentPlayer,
        });
        currentPlayer = currentPlayer == 1 ? 2 : 1;
      } else {
        message.innerHTML = `Город <b>${city}</b> уже введен. Введите другой город на буквук <b>${endWord[
          endWord.length - 1
        ].toUpperCase()}</b>`;
      }

      console.log(cities);
    }

    // проверка имени города на последнюю букву
    function checkWordCityName(word) {
      if (word[word.length - 1] == "ь") {
        return word.slice(0, word.length - 1);
      } else {
        return word;
      }
    }
  }
});
