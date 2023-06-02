import './styles.css';
import './index.html';
import verticalDots from './assets/verticalDots.svg';
import trash from './assets/trash.svg';

// const task = [];
const tasksList = document.querySelector('#tasksList');
const newTaskInput = document.querySelector('#newTaskInput');
let liElements = document.querySelectorAll('li');
let checkbox = document.querySelectorAll('.cb');
// let textarea = document.querySelectorAll('.ta');
const clearAllCompleted = document.querySelector('.h3Container');

function addTask(description, checkStatus) {
  const li = document.createElement('li');
  const cb = document.createElement('input');
  const input = document.createElement('input');
  const image = document.createElement('img');
  cb.setAttribute('type', 'checkbox');
  cb.checked = checkStatus;
  cb.classList.add('cb');
  input.setAttribute('type', 'textarea');
  input.value = description;
  input.classList.add('ta');
  image.src = verticalDots;
  image.alt = 'dots';
  li.prepend(cb);
  li.appendChild(input);
  li.appendChild(image);
  tasksList.appendChild(li);
  checkbox = document.querySelectorAll('.cb');
  // textarea = document.querySelectorAll('.ta');
  liElements = document.querySelectorAll('li');
  // task[index] = {
  // description,
  // completed: checkStatus,
  // index,
  // };
  // localStorage.setItem(index, JSON.stringify(task[index]));
}

function editTask(x) {
  x.parentElement.classList.add('yellow_li');
  x.parentElement.querySelector('img').setAttribute('src', trash);
  x.parentElement.querySelector('img').setAttribute('alt', 'trash');
}

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

clearAllCompleted.addEventListener('click', () => clearCompleted());

document.addEventListener('click', (e) => {
  if (e.target.alt === 'trash') {
    e.target.parentElement.remove();
  }
  liElements.forEach((element) => {
    if (element.matches('.yellow_li')) {
      element.classList.remove('yellow_li');
      element.querySelector('img').setAttribute('src', verticalDots);
      element.querySelector('img').setAttribute('alt', 'dots');
    }
  });
  if (document.activeElement.matches('.ta') || (e.target.alt === 'dots')) {
    // Focuses on textarea input if verticalDots img is clicked
    e.target.parentElement.querySelector('.ta').focus();
    editTask(e.target);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Cambiar la lógica del Local Storage porque se puede estar almacenando otras cosas
  if (localStorage.length === 0) {
    addTask('Wash the dogs', false);
    addTask('Complete To Do list project', false);
    addTask('fix car', false);
  }
});
