import './styles.css';
import './index.html';

const checkbox = document.querySelectorAll('input[type=checkbox]');
// let checked = document.querySelectorAll('input:checked');

checkbox.forEach((a) => {
  a.addEventListener('click', (e) => {
    e.target.parentElement.classList.toggle('textLineThrough');
  });
});

// if (checked.length === 0) {
// console.log('No checkboxes checked');
// } else {
// console.log(`${checked.length}, checkboxes checked`);
// }
