import './styles.css';
import './index.html';
import verticalDots from './assets/verticalDots.svg';
// import trash from './assets/trash.svg';

// const task = [];
const tasksList = document.querySelector('#tasksList');
const newTaskInput = document.querySelector('#newTaskInput');
// let liElements = document.querySelectorAll('li');
let checkbox;
const clearAllCompleted = document.querySelector('.h3Container');

function addTask(description, checkStatus) {
  // const index = task.length;
  const li = document.createElement('li');
  const cb = document.createElement('input');
  const span = document.createElement('span');
  const image = document.createElement('img');
  // const hr = document.createElement('hr');
  cb.setAttribute('type', 'checkbox');
  cb.checked = checkStatus;
  span.textContent = description;
  image.src = verticalDots;
  image.alt = 'dots';
  li.prepend(cb);
  li.appendChild(span);
  li.appendChild(image);
  tasksList.appendChild(li);
  // tasksList.appendChild(hr);
  checkbox = document.querySelectorAll('input[type=checkbox]');
  // liElements = document.querySelectorAll('li');
  // task[index] = {
  // description,
  // completed: checkStatus,
  // index,
  // };
  // localStorage.setItem(index, JSON.stringify(task[index]));
}

// function editTask(x) {
// console.log('Entra');
// }
function clearCompleted() {
  checkbox.forEach((element) => {
    if (element.checked) {
      element.parentElement.remove(); // Deletes the selected tasks
    }
  });
}

newTaskInput.addEventListener('keydown', (e) => {
  const newTask = e.target.value.trim();
  if ((e.key === 'Enter' || e.key === 'NumpadEnter') && (newTask.length > 0)) {
    addTask(newTask, false);
    e.target.value = '';
  }
});

// liElements.forEach((a) => {
// a.addEventListener('click', () => editTask(a));
// });

clearAllCompleted.addEventListener('click', () => clearCompleted());

document.addEventListener('DOMContentLoaded', () => {
  // Cambiar la lógica del Local Storage porque se puede estar almacenando otras cosas
  if (localStorage.length === 0) {
    addTask('Wash the dogs', false);
    addTask('Complete To Do list project', false);
    addTask('fix car', false);
  }
});
