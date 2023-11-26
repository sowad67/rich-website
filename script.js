window.onload = function () {

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 80;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

var elements = document.getElementsByClassName('typewrite');
for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
    }

    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
}

// Add scroll event listener for arrows
window.addEventListener("scroll", function () {
    var arrows = document.querySelector('.arrows');
    var scrollPosition = window.scrollY || window.pageYOffset;

    // Adjust this value based on when you want the rotation to occur
    var scrollThreshold = document.documentElement.scrollHeight - window.innerHeight - 100;

    if (scrollPosition >= scrollThreshold) {
        arrows.style.transform = 'rotate(180deg) translateY(70px)';
    } else {
        arrows.style.transform = 'none'; // Reset rotation
    }
});

// Function to check if an element is in the viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle the scroll event for fade-in elements
function handleScroll() {
    var fadeElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .fade-in-top, .fade-in-bottom');

    fadeElements.forEach(function(element) {
        if (isInViewport(element) && !element.classList.contains('visible')) {
            element.classList.add('visible');
        }
    });
}

// Add scroll event listener for fade-in elements
window.addEventListener("scroll", handleScroll);

// Initial check on page load for fade-in elements
handleScroll();
};