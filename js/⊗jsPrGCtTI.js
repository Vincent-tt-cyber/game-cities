document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector(".start-button");
  const finishButton = document.querySelector(".finish-button");
  const message = document.querySelector(".message");
  const cityInput = document.querySelector(".city-input");
  const currentPlayerElem = document.querySelector(".current-player");
  const gameInfo = document.querySelectorAll(".game-info p");
  const resultDiv = document.querySelector(".result");

  // Города
  let citiesData = [];

  // Игровые переменные
  let isFirstStart = true;
  let currentPlayer = 1;
  let lastLetter = null;
  // let fisrtLetter = null;

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
      cityInput.focus();
    }

    cityInput.addEventListener("keypress", handleCityInput);
  }

  // Обработка ввода города
  function handleCityInput(e) {
    if (e.key === "Enter") {
      let cityValue =
        cityInput.value[0].toUpperCase() + cityInput.value.slice(1);

      if (!cityValue || cityValue == "") {
        message.textContent = "Введите название города.";
        return;
      }

      // Проверка на первый запуск
      if (isFirstStart) {
        addCityToArray(cityValue);
        isFirstStart = false;

        // Последняя буква города
        lastLetter = citiesData[citiesData.length - 1].name
          .slice(-1)
          .toUpperCase();

        message.innerHTML = `Игрок ${currentPlayer}, введите город начинающийся с буквы <b>${lastLetter}</b>`;
        // Очистка инпута
        cityInput.value = "";
        message.textContent = "";
      }

      if (!isFirstStart) {
        const someCity = citiesData.some((city) => city.name == cityValue);
        // let firtLetter = cityValue[0].toUpperCase();

        if (someCity) {
          message.innerHtml = `Город <b>${cityValue}</b> уже был назван. Введите город начинающийся с буквы <b>${lastLetter}</b>`;
        }
        // console.log("Город:", cityValue, "существует:", someCity);
        // console.log();

        // console.log("Город:", cityValue, "существует:", someCity);
      }
    }
  }

  function addCityToArray(city) {
    citiesData.push({
      name: city,
      player: currentPlayer,
    });

    currentPlayer = currentPlayer === 1 ? 2 : 1;
  }

  function finishGame() {
    // Показываем необходимые элементы
    startButton.style.display = "block";
    finishButton.style.display = "none";

    const player1Cities = citiesData.filter((city) => city.player === 1).length;
    const player2Cities = citiesData.filter((city) => city.player === 2).length;

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
    <p>Всего названо городов: ${citiesData.length}</p>
    `;

    cityInput.style.display = "none";
    currentPlayerElem.style.display = "none";
    message.style.display = "none";
    gameInfo.forEach((info) => (info.style.display = "block"));

    citiesData = [];
    isFirstStart = true;
    currentPlayer = 1;
    requiredLetter = null;
  }
});
