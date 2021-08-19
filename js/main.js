window.onload = function() {
  let building = document.querySelector('.buiding'); // Находим картинку с домом и этажами
  let floors = document.querySelectorAll('[data-floor]'); // Находим все этажи
  let counter = document.querySelector('.counter__value'); // Находим счетчик этажей
  let btnUp = document.querySelector('.counter__button--up'); // Находим кнопку вверх
  let btnDown = document.querySelector('.counter__button--down'); // Находим кнопку вниз
  let currentFloor = 2; // Задаем этаж по умолчанию

  building.addEventListener('mouseover', (event) => { // Обработчик наведения на этаж
    let checkedFloor = event.target;

    if (checkedFloor.getAttribute('data-floor')) { // Проверяем есть ли у элемента на который навели атрибут data-floor
      currentFloor = checkedFloor.getAttribute('data-floor'); // Если есть записываем значение data-floor в текущий этаж
      selectFloor();
    }
  });

  btnUp.addEventListener('click', () => { // Обработка нажатия на кнопку вверх
    if (currentFloor < 18) {
      currentFloor++;
      selectFloor();
    }
  });

  btnDown.addEventListener('click', () => { // Обработка нажатия на кнопку вверх
    if (currentFloor > 2) {
      currentFloor--;
      selectFloor();
    }
  });
  
  function floorFormatting(floorNember) { // Форматирование номера этажа (добваление 0 впереди если значение меньше 10)
    return floorNember.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false});
  }

  function currentFloorFind() { // Поиск элемента текущего этажа
    for (let floor of floors) {
      if (floor.getAttribute('data-floor') == floorFormatting(currentFloor)) return floor;
    }
  }

  function clearSelectedFloors() { // Очистка выбранных этажей
    for (let floor of floors) {
      floor.classList.remove('current-floor');
    }
  }

  function selectFloor() { // Смена выбранного этажа
    clearSelectedFloors(); // Очищаем выбранный ранее этаж
    counter.innerHTML = floorFormatting(currentFloor); // Меняем значение текущено этажа в счетчике
    currentFloorFind().classList.add('current-floor'); // Подсвечиваем выбранный этаж
  }
}
