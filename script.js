
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
      tb();  list3();
      form1.reset(); // очищаем форму
    });
  });


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
      tb();  list3();
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

