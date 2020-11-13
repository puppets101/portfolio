/** LOAD MAIN ON LOAD */
window.addEventListener('load', main);

/** START ON PROGRAM */
function main() {
  addEventListeners();
}
/** CONTAINS FUNCTION CALLS */
function addEventListeners() {
  formValidation();
  smoothScroll();
  navbarColored();
  footerColored();
}

/** Colors navbar when scroll */
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

/** Colors footer when scroll */
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

function formValidation() {
  const form = document.getElementById('form');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const textarea = document.getElementById('textarea');

  /**
   * @param {email} email check if typed email is valid
   */
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  /** Check if input boxes are filled or not */
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (name.value === '') {
      showError(name, 'Please fill in your name');
    } else {
      showSuccess(name);
    }
    if (email.value === '') {
      showError(email, 'Please fill in your email');
    } else if(!isValidEmail(email.value)) {
      showError(email, 'Please fill in a valid email');
    } else {
      showSuccess(email);
    }
    if (subject.value === '') {
      showError(subject, 'Please enter a subject');
    } else {
      showSuccess(subject);
    }
    if (textarea.value === '') {
      showError(textarea, 'Please enter a message');
    } else {
      showSuccess(textarea);
    }
  });

  /**
   * 
   * @param {input} input user input
   * @param {message} message show error message in small tag if invalid
   */
  function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
  }

  // Show input success outline 
  /**
   * 
   * @param {input} input user input 
   */
  function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }
}


/** Smooth scroll from cdn.jsdelivr.net */
function smoothScroll() {
  const scroll = new SmoothScroll('a[href*="#"]');
}

// TYPEWRITER
/**
 * 
 * @param {*} txtElement 
 * @param {*} words 
 * @param {*} wait 
 */
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