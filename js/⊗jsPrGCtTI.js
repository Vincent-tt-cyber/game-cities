document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector(".start-button");
  const finishButton = document.querySelector(".finish-button");
  const message = document.querySelector(".message");
  const cityInput = document.querySelector(".city-input");
  const currentPlayerElem = document.querySelector(".current-player");
  const gameInfo = document.querySelectorAll(".game-info p");
  const resultDiv = document.querySelector(".result");

  // Города
  let cities = [];

  // Игровые переменные
  let isFirstStart = true;
  let currentPlayer = 1;
  let fisrtLetter = null;

  startButton.addEventListener("click", startGame);
  finishButton.addEventListener("click", finishGame);

  // Старт игры
  function startGame() {
    // Показываем необходимые элементы
    startButton.style.display = "none";
    finishButton.style.display = "block";

    resultDiv.innerHTML = "";

    gameInfo.forEach((info) => (info.style.display = "none"));
    cityInput.style.display = "block";
    currentPlayerElem.style.display = "block";

    // Если первый запуск
    if (isFirstStart) {
      message.textContent = `Игрок ${currentPlayer}, введите любой город.`;
      message.style.display = "block";
      isFirstStart = false;
      cityInput.focus();
    }

    cityInput.addEventListener("keypress", handleCityInput);
  }

  function handleCityInput(event) {
    if (event.key !== "Enter") return;

    const city = cityInput.value;

    if (!city) return;

    let lastAddCity = cities.some(
      (item) => item.name.toLowerCase() == city.toLowerCase()
    );

    // Последняя буква
    let lastLetter = getLastLetter(city);
    fisrtLetter = lastLetter;

    if (lastAddCity) {
      fisrtLetter = getLastLetter(cities[cities.length - 1].name);
      message.innerHTML = `Город <b>${
        city[0].toUpperCase() + city.slice(1)
      }</b> уже был введен. Введите другой город на букву <b>${fisrtLetter.toUpperCase()}</b>.`;

      cityInput.value = "";
      cityInput.focus();

      return;
    }

    console.log("Последняя буква", lastLetter);
    console.log("Должны быть первая буква", fisrtLetter);

    // Добавляем город
    cities.push({
      name: city[0].toUpperCase() + city.slice(1),
      player: currentPlayer,
    });

    // Обновление интерфейса
    message.innerHTML = `Игрок ${currentPlayer} ввел город: <b>${
      cities[cities.length - 1].name
    }</b>. Следующий город должен начинаться на букву <b>${lastLetter.toUpperCase()}</b>.`;

    //Меняем игрока
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    currentPlayerElem.textContent = `Вводит: Игрок ${currentPlayer}`;

    // Сбрасываем инпут
    cityInput.value = "";
    cityInput.focus();

    console.log(cities);
  }

  function getLastLetter(word) {
    const lastChar = word[word.length - 1].toLowerCase();

    // исключаем проблемные буквы
    if (["ь", "ъ", "ы"].includes(lastChar)) {
      return word[word.length - 2].toLowerCase();
    }
    return lastChar;
  }

  function finishGame() {
    // Показываем необходимые элементы
    startButton.style.display = "block";
    finishButton.style.display = "none";

    const player1Cities = cities.filter((city) => city.player === 1).length;
    const player2Cities = cities.filter((city) => city.player === 2).length;

    let winMessage = "";
    if (player1Cities > player2Cities) {
      winMessage = `Победил игрок 1. Количество городов: ${player1Cities}`;
    } else if (player1Cities < player2Cities) {
      winMessage = `Победил игрок 2. Количество городов: ${player2Cities}`;
    } else {
      winMessage = `Ничья. Количество городов: ${player1Cities}`;
    }

    resultDiv.innerHTML = `
    <h3>Игра окончена!</h3>
    <p>${winMessage}</p>
    <p>Всего названо городов: ${cities.length}</p>
    `;

    cityInput.style.display = "none";
    currentPlayerElem.style.display = "none";
    message.style.display = "none";
    gameInfo.forEach((info) => (info.style.display = "block"));

    cities = [];
    isFirstStart = true;
    currentPlayer = 1;
    requiredLetter = null;
  }
});
