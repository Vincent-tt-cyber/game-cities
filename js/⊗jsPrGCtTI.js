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

        // Вывод сообщения для игрока
        message.innerHTML = `Игрок ${currentPlayer} ввел город: <b>${city}</b>. Введите город начинающийся с последней буквы <b></p>${city[
          city.length - 1
        ].toUpperCase()}</b>`;

        cityInput.value = "";
        cityInput.focus();

        // Добавления города в массив
        cities.push({
          name: city,
          player: currentPlayer,
        });

        currentPlayer = currentPlayer === 1 ? 2 : 1;

        document.querySelector(
          ".current-player"
        ).textContent = `Вводит: Игрок ${currentPlayer}`;

        console.log(cities);
      }
    });
  }
});
