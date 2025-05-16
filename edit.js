

// Получаем параметры из URL
  const urlParams = new URLSearchParams(window.location.search);
  const nameParam = urlParams.get('name'); // получаем значение 
  const ageParam = urlParams.get('age'); // получаем значение 
  const idParam = Number(urlParams.get('id')); // получаем значение 
 
 // Находим форму по имени
  const form = document.forms['fmed'];

// Находим input с name="name"
  const inputName = form.elements['name'];
      if (inputName) {
// Устанавливаем placeholder равным значению параметра из URL
        inputName.placeholder = nameParam;
      }

// Находим input с name="age"
  const inputAge = form.elements['age'];
      if (inputAge) {
// Устанавливаем placeholder равным значению параметра из URL
        inputAge.placeholder = ageParam;
      }





// Отправка данных формы
const form1 = document.getElementById('fmed');
  form1.addEventListener('submit', function(event) {
    event.preventDefault();

  const formData = new FormData(form1); // Сбор данных формы
  const FormDataObject = Object.fromEntries(formData);

console.log(FormDataObject.id);
console.log(FormDataObject.name);
console.log(FormDataObject.age);
let nameP;
let ageP;
if (FormDataObject.name) {nameP=FormDataObject.name;} else {nameP=nameParam;}
if (FormDataObject.age) {ageP=FormDataObject.age;} else {ageP=ageParam;}

  fetch('http://truruki.ru/api/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      name: nameP,
      age: ageP,
      id: idParam,
      views: 0,
    })
  })
    .then(response => response.json())
    .then(j => {
      console.log(j);      
      form1.reset(); // очищаем форму
      inputName.placeholder =FormDataObject.name;
      inputAge.placeholder =FormDataObject.age;

    });
  });