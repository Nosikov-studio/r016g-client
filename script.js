
const f5 = document.querySelector('.f5')
const r5 = document.querySelector('.result5')

// **********************получение данных из БД и вставка в таблицу***************************
function tb() {

fetch('http://truruki.ru/api')
    .then(response => response.json())
    .then(j => {
      const html = j.map(item => `<tr><td>${item.name}</td><td>${item.age}</td><tr>`).join('');
      r5.innerHTML =`<table> ${html} </table>`;
      
})
}

tb();
//*******************************вставка новой записи из формы в БД */*********************** */
const form1 = document.getElementById('form1');
  form1.addEventListener('submit', function(event) {
    event.preventDefault();

  const formData = new FormData(form1); // Сбор данных формы
  const FormDataObject = Object.fromEntries(formData);

  fetch('http://truruki.ru/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      ...FormDataObject,
      views: 0,
    })
  })
    .then(response => response.json())
    .then(j => {
      console.log(j);
      tb(); list(); list2(); list3();
      form1.reset(); // очищаем форму
    });
  });

  //***************************вывод простого списка из БД*********************************************** */

  const r6 = document.querySelector('.result6')

function list() {

fetch('http://truruki.ru/api')
    .then(response => response.json())
    .then(j => {
      const html = j.map(item => `<li>${item.name}------${item.age}</li>`).join('');
      r6.innerHTML =`<ul> ${html} </ul>`;
      
})
}

list();

//**************************список с ссылками, переход на редактирование (edit.html)************************************************ */

 const r7 = document.querySelector('.result7')

function list2() {

fetch('http://truruki.ru/api')
    .then(response => response.json())
    .then(j => {
      const html = j.map(item => `<li><a href="/edit.html?id=${item.id}&name=${item.name}&age=${item.age}">${item.name}------${item.age}<a/></li>`).join('');
      r7.innerHTML =`<ul> ${html} </ul>`;
      
})
}

list2();

//****************************список с ссылками и кнопками, удаление по кнопке********************************************** */

 const r8 = document.querySelector('.result8')

function list3() {

fetch('http://truruki.ru/api')
    .then(response => response.json())
    .then(j => {
      const html = j.map(item => `<li><a href="/edit.html?id=${item.id}&name=${item.name}&age=${item.age}">
        ${item.name}------${item.age} <a/>
            <button class="btn" id="${item.id}"> -delete- </button>
        </li>`).join('');
      r8.innerHTML =`<ul> ${html} </ul>`;

// Получаем все кнопки с классом 'btn'
const buttons = document.querySelectorAll('.btn');

// Функция-обработчик клика
function handleClick(event) {

event.preventDefault();
console.log('Нажата кнопка в элементе списка:', event.target.parentElement.textContent.trim());
console.log(event.target);
console.log(event.target.id);
fetch(`http://truruki.ru/delete/${Number(event.target.id)}`, {method: 'POST',})
    .then(response => response.json())
    .then(j => {
      tb(); list(); list2(); list3();
      console.log(j);     
})
}

// Навешиваем обработчик на каждую кнопку
buttons.forEach(button => {
button.addEventListener('click', handleClick);
}); 


})
}

list3();

//***************************работа с библиотекой axios***************************** */
function a() {
const r9 = document.querySelector('.result9')

//Пример простого GET-запроса:

axios.get('http://truruki.ru/api')
  .then(response => {
    console.log(response.data);
    const h = response.data.map(item => `<tr><td>${item.name}</td><td>${item.age}</td><tr>`).join('');
      r9.innerHTML =`<table> ${h} </table>`;
  })
  .catch(error => {
    console.error('Ошибка при запросе:', error);
  });
}

a();

//*************************10) форма ввода в модальном окне */******************************* */
const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModal');
const okBtn = document.getElementById('okBtn');
const cancelBtn = document.getElementById('cancelBtn');
const userInput = document.getElementById('userInput');

openBtn.onclick = () => {
  modal.style.display = 'flex';
  userInput.focus();
};

okBtn.onclick = () => {
  const value = userInput.value;
  alert('Вы ввели: ' + value);
  modal.style.display = 'none';
  userInput.value = '';
};

cancelBtn.onclick = () => {
  modal.style.display = 'none';
  userInput.value = '';
};

// Закрытие при клике вне окна
modal.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    userInput.value = '';
  }
};

//*************************11) форма ввода в модальном окне (наш случай) */*************************** */
const modal11 = document.getElementById('modal11');
const openBtn11 = document.getElementById('openModal11');
const okBtn11 = document.getElementById('okBtn11');
const cancelBtn11 = document.getElementById('cancelBtn11');
const userInput11 = document.getElementById('userInput11');

openBtn11.onclick = () => {
  modal11.style.display = 'flex';
  userInput11.focus();
};

okBtn11.onclick = () => {
  const name = userInput11.value;
  const age = ageInput11.value;
  alert('Вы ввели: ' + name+" " +age);
// Отправка данных в БД
        fetch('http://truruki.ru/api', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          name: name,
          age: age,
          views: 0,
          })
        })
        .then(response => response.json())
        .then(j => {
        console.log(j);
        tb(); list(); list2(); list3(); a(); // обновления отображения в свете новой записи в БД
        });

  modal11.style.display = 'none';
  userInput11.value = '';
  ageInput11.value = '';
};


cancelBtn11.onclick = () => {
  modal11.style.display = 'none';
  userInput11.value = '';
};

// Закрытие при клике вне окна
modal11.onclick = (e) => {
  if (e.target === modal11) {
    modal11.style.display = 'none';
    userInput11.value = '';
  }
};

//*************************12) ***************************************** */
