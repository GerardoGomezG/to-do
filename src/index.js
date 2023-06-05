import './styles.css';
import './index.html';
import verticalDots from './assets/verticalDots.svg';
import trash from './assets/trash.svg';

let savedTasks = []; // Array to save tasks
const tasksList = document.querySelector('#tasksList'); // List container
const newTaskInput = document.querySelector('#newTaskInput'); // New task input
let liElements = document.querySelectorAll('li'); // List of <li>
let checkbox = document.querySelectorAll('.cb'); // List of input type = checkbox
const clearAllCompleted = document.querySelector('.h3Container');

function loadSavedTasks() {
  savedTasks = JSON.parse(localStorage.getItem('savedTasks'));
  savedTasks.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('id', liElements.length);
    const cb = document.createElement('input');
    cb.setAttribute('type', 'checkbox');
    cb.checked = item.completed;
    cb.classList.add('cb');
    const input = document.createElement('input');
    input.setAttribute('type', 'textarea');
    input.value = item.description;
    input.classList.add('ta');
    const image = document.createElement('img');
    image.src = verticalDots;
    image.alt = 'menu';
    li.prepend(cb);
    li.appendChild(input);
    li.appendChild(image);
    tasksList.appendChild(li);
    checkbox = document.querySelectorAll('.cb');
    liElements = document.querySelectorAll('li');
  });
}

function addTask(description) {
  const li = document.createElement('li');
  li.setAttribute('id', liElements.length);
  const cb = document.createElement('input');
  const input = document.createElement('input');
  const image = document.createElement('img');
  cb.setAttribute('type', 'checkbox');
  cb.checked = false;
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
  savedTasks.push({ description, completed: cb.checked, index: savedTasks.length });
  localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
}

function editTask(x) {
  x.parentElement.classList.add('yellow_li');
  x.parentElement.querySelector('img').setAttribute('src', trash);
  x.parentElement.querySelector('img').setAttribute('alt', 'delete');
}

newTaskInput.addEventListener('keydown', (e) => {
  const newTask = e.target.value.trim();
  if ((e.key === 'Enter' || e.key === 'NumpadEnter') && (newTask.length > 0)) {
    addTask(newTask, false);
    e.target.value = '';
  }
});

document.addEventListener('keyup', (e) => {
  if (e.target.matches('.ta')) {
    const el = e.target.parentElement;
    savedTasks.splice(el.id, 1, {
      description: e.target.value,
      completed: e.target.checked,
      index: el.id,
    });
    localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
  }
});

clearAllCompleted.addEventListener('click', () => {
  checkbox.forEach((element) => {
    if (element.checked) {
      element.parentElement.remove(); // Deletes the selected tasks
    }
  });
  checkbox = document.querySelectorAll('.cb');
  liElements = document.querySelectorAll('li');
  savedTasks = savedTasks.filter((savedTasks) => savedTasks.completed === false);
  localStorage.removeItem('savedTasks');
  let i = 0;
  liElements.forEach((element) => {
    element.setAttribute('id', i);
    savedTasks[i].index = i;
    localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
    i += 1;
  });
});

document.addEventListener('click', (e) => {
  if (e.target.alt === 'delete') {
    const el = e.target.parentElement;
    savedTasks.splice(el.id, 1);
    el.remove();
    checkbox = document.querySelectorAll('.cb');
    liElements = document.querySelectorAll('li');
    localStorage.removeItem('savedTasks');
    let i = 0;
    liElements.forEach((element) => {
      element.setAttribute('id', i);
      savedTasks[i].index = i;
      localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
      i += 1;
    });
  }
  liElements.forEach((element) => {
    if (element.matches('.yellow_li')) {
      element.classList.remove('yellow_li');
      element.querySelector('img').setAttribute('src', verticalDots);
      element.querySelector('img').setAttribute('alt', 'menu');
    }
  });
  if (document.activeElement.matches('.ta') || (e.target.alt === 'menu')) {
    // Focuses on textarea input if verticalDots img is clicked
    e.target.parentElement.querySelector('.ta').focus();
    editTask(e.target);
  }
  if (e.target.matches('.cb')) {
    const el = e.target.parentElement;
    savedTasks.splice(el.id, 1, {
      description: el.querySelector('.ta').value,
      completed: e.target.checked,
      index: el.id,
    });
    localStorage.setItem('savedTasks', JSON.stringify(savedTasks));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  let flag = false;
  for (let i = 0; i < localStorage.length; i += 1) {
    if (localStorage.key(i) === 'savedTasks') {
      flag = true;
      break;
    }
  }
  if (flag) loadSavedTasks();
  else {
    addTask('Wash the dogs');
    addTask('Complete To Do list project');
    addTask('fix car');
  }
});
