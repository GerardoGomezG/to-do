import './styles.css';
import './index.html';
import verticalDots from './assets/verticalDots.svg';
import trash from './assets/trash.svg';

const savedTasks = [];
const tasksList = document.querySelector('#tasksList');
const newTaskInput = document.querySelector('#newTaskInput');
let liElements = document.querySelectorAll('li');
let checkbox = document.querySelectorAll('.cb');
const clearAllCompleted = document.querySelector('.h3Container');

function addTask(description, checkStatus) {
  const li = document.createElement('li');
  const cb = document.createElement('input');
  const input = document.createElement('input');
  const image = document.createElement('img');
  const task = [];
  cb.setAttribute('type', 'checkbox');
  cb.checked = checkStatus;
  cb.classList.add('cb');
  input.setAttribute('type', 'textarea');
  input.value = description;
  input.classList.add('ta');
  image.src = verticalDots;
  image.alt = 'menu';
  li.prepend(cb);
  li.appendChild(input);
  li.appendChild(image);
  tasksList.appendChild(li);
  checkbox = document.querySelectorAll('.cb');
  liElements = document.querySelectorAll('li');
  // Task saving in an array element
  task.push({ description, completed: checkStatus, index: savedTasks.length });
  savedTasks.push(task);
  // Local-Storage saving
  localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
}

function editTask(x) {
  x.parentElement.classList.add('yellow_li');
  x.classList.add('yellow_li');
  x.parentElement.querySelector('img').setAttribute('src', trash);
  x.parentElement.querySelector('img').setAttribute('alt', 'delete');
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
  if (e.target.alt === 'delete') {
    e.target.parentElement.remove();
  }
  liElements.forEach((element) => {
    if (element.matches('.yellow_li')) {
      element.classList.remove('yellow_li');
      element.querySelector('.ta').classList.remove('yellow_li');
      element.querySelector('img').setAttribute('src', verticalDots);
      element.querySelector('img').setAttribute('alt', 'menu');
    }
  });
  if (document.activeElement.matches('.ta') || (e.target.alt === 'menu')) {
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
