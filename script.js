window.addEventListener('load', main);

function main() {
  addEventListeners();
  smoothScroll();
  navbarColored();
  footerColored();
}

function navbarColored() {
  window.addEventListener('scroll', function(e) {
    const navbar = document.getElementById('home');
    if(document.documentElement.scrollTop || document.body.scrollTop > window.innerHeight) {
      navbar.classList.add('navbar-colored');
      navbar.classList.remove('navbar-transparent');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('navbar-colored');
    }
  });
}

function footerColored() {
  window.addEventListener('scroll', function(e) {
    const footer = document.getElementById('footer-content');
    if(document.documentElement.scrollTop || document.body.scrollTop > window.innerHeight) {
      footer.classList.add('footer-colored');
      footer.classList.remove('footer-transparent');
    } else {
      footer.classList.add('footer-transparent');
      footer.classList.remove('footer-colored');
    }
  })
}

function addEventListeners() {
  const form = document.getElementById('form');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const textarea = document.getElementById('textarea');

  // Check email is valid (grabbed from stack overflow)
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    // name
    if (name.value === '') {
      showError(name, 'Please fill in your name');
    } else {
      showSuccess(name);
    }
    // email
    if (email.value === '') {
      showError(email, 'Please fill in your email');
    } else if(!isValidEmail(email.value)) {
      showError(email, 'Please fill in a valid email');
    } else {
      showSuccess(email);
    }
    // subject
    if (subject.value === '') {
      showError(subject, 'Please enter a subject');
    } else {
      showSuccess(subject);
    }
    // textarea
    if (textarea.value === '') {
      showError(textarea, 'Please enter a message');
    } else {
      showSuccess(textarea);
    }
  });
}

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Show input success outline 
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// SCROLL
function smoothScroll() {
  const scroll = new SmoothScroll('a[href*="#"]');
}

// TYPEWRITER
const TypeWriter = function(txtElement, words, wait = 3000) {
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

// Type method 
TypeWriter.prototype.type = function() {
  // Current index of word
  const current = this.wordIndex % this.words.length;
  // Get full text of current word
  const fullText = this.words[current];

  // Check if deleting
  if(this.isDeleting) {
    // Remove character 
    this.txt = fullText.substring(0, this.txt.length - 1);
    } else {
    // Add cheracter 
    this.txt = fullText.substring(0, this.txt.length + 1);
  }

  // Insert txt into element 
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  // Initial type speed
  let typeSpeed = 300;
  if(this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if(!this.isDeleting && this.txt === fullText) {
    // Make pause at end
    typeSpeed = this.wait;
    // Set delete to true
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    // Move to next word 
    this.wordIndex++;
    // Pause before start typing next word
    typeSpeed = 500;
  }

  setTimeout(() => this.type(), typeSpeed);
}

// Initial on DOM load
document.addEventListener('DOMContentLoaded', init);

// Initial app
function init() {
  const txtElement = document.getElementById('txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}