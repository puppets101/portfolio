window.addEventListener('load', main);

function main() {
  addEventListeners();
  smoothScroll();
}

function addEventListeners() {

}

function smoothScroll() {
  let scroll = new SmoothScroll('a[href*="#"]');
}


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