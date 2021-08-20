window.onload = function() {
  const building = document.querySelector('.buiding'); // Находим картинку с домом и этажами
  const floors = document.querySelectorAll('[data-floor]'); // Находим все этажи
  const counter = document.querySelector('.counter__value'); // Находим счетчик этажей
  const btnUp = document.querySelector('.counter__button--up'); // Находим кнопку вверх
  const btnDown = document.querySelector('.counter__button--down'); // Находим кнопку вниз
  const btnShowFlors = document.getElementById('btnShowFlors'); // Находим кнопку вниз
  const btnModalClose = document.getElementById('modal-close'); // Находим кнопку вниз
  let currentFloor = 2; // Задаем этаж по умолчанию
  
  const modal = document.querySelector('.modal-holder');
  const modalCounter = document.querySelector('.modal-counter'); // Находим счетчик этажей в модалке
  const modalFloor = document.querySelector('.flats'); // Находим картинку квартирами
  const flatsList = document.querySelector('.flats-list'); // Находим текстовый список квартир
  const flats = modalFloor.querySelectorAll('[data-flat]'); // Находим все квартиры
  const flatsListItems = flatsList.querySelectorAll('[data-flat]'); // Находим текстовые описания квартир
  let currentFlat = 0; // Задаем квартиру по умолчанию

  building.addEventListener('mouseover', (event) => { // Обработчик наведения на этаж
    let checkedFloor = event.target;
    if (checkedFloor.getAttribute('data-floor')) { // Проверяем есть ли у элемента на который навели атрибут data-floor
      currentFloor = checkedFloor.getAttribute('data-floor'); // Если есть записываем значение data-floor в текущий этаж
      selectFloor();
    }
  });

  building.addEventListener('click', () => { 
    showModal();
  });

  btnShowFlors.addEventListener('click', () => { 
    showModal();
  });

  btnModalClose.addEventListener('click', () => { 
    showModal();
  });

  modalFloor.addEventListener('mouseover', (event) => { // Обработчик наведения на квартиру
    let checkedFlat = event.target;
    if (checkedFlat.getAttribute('data-flat')) { // Проверяем есть ли у элемента на который навели атрибут data-floor
      currentFlat = checkedFlat.getAttribute('data-flat'); // Если есть записываем значение data-floor в текущий этаж
      selectFlat();
    }
  });

  flatsList.addEventListener('mouseover', (event) => { // Обработчик наведения на квартиру
    let checkedFlat = event.target;
    if (checkedFlat.getAttribute('data-flat')) { // Проверяем есть ли у элемента на который навели атрибут data-floor
      currentFlat = checkedFlat.getAttribute('data-flat'); // Если есть записываем значение data-floor в текущий этаж
      selectFlat();
    }
  });

  btnUp.addEventListener('click', () => { // Обработка нажатия на кнопку вверх
    if (currentFloor < 18) {
      currentFloor++;
      selectFloor();
    }
  });

  btnDown.addEventListener('click', () => { // Обработка нажатия на кнопку вниз
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

  function currentFlatFind() { // Поиск элемента текущей квартиры
    for (let flat of flats) {
      if (flat.getAttribute('data-flat') == currentFlat) return flat;
    }
  }

  function currentFlatTextFind() { // Поиск описания текущей квартиры
    for (let flat of flatsListItems) {
      if (flat.getAttribute('data-flat') == currentFlat) return flat;
    }
  }

  function clearSelectedItems(itemsList, clearClass) { // Очистка выбранных элементов
    for (let item of itemsList) {
      item.classList.remove(clearClass);
    }
  }

  function selectFloor() { // Смена выбранного этажа
    clearSelectedItems(floors, 'current-floor'); // Очищаем выбранный ранее этаж
    counter.innerHTML = floorFormatting(currentFloor); // Меняем значение текущено этажа в счетчике
    modalCounter.innerHTML = floorFormatting(currentFloor);
    currentFloorFind().classList.add('current-floor'); // Подсвечиваем выбранный этаж
  }

  function selectFlat() { // Смена выбранной квартиры
    clearSelectedItems(flats, 'current-flat');
    clearSelectedItems(flatsListItems, 'current-flat-text');
    currentFlatTextFind().classList.add('current-flat-text'); 
    currentFlatFind().classList.add('current-flat'); 
  }

  function showModal() {
    modal.classList.toggle('modal-holder--show');
  }
}
