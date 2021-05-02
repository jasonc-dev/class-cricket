import '@babel/polyfill';
import { login, signup, logout } from './auth';
import { bookCourse } from './stripe';

// DOM ELEMENTS
const toggleCollapse = document.querySelector('.toggle-collapse span');
const nav = document.querySelector('.nav');

const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const bookBtn = document.getElementById('book-course');

// onclick event on toggle Collapse span tag
toggleCollapse.onclick = (e) => {
  nav.classList.toggle('collapse');
  e.target.classList.toggle('toggle-click');
};

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    signup(email, password, passwordConfirm);
  });

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { courseId } = e.target.dataset;
    bookCourse(courseId);
  });
