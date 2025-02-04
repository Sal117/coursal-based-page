
jQuery(document).ready(function($) {
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");
let carousel = document.querySelector(".carousel");
let listHTML = document.querySelector(".carousel .list");
let seeMoreButtons = document.querySelectorAll(".seeMore");
let backButton = document.getElementById("back");

nextButton.onclick = function () {
  showSlider("next");
};

prevButton.onclick = function () {
  showSlider("prev");
};

let unAcceppClick;
const showSlider = (type) => {
  nextButton.style.pointerEvents = "none";
  prevButton.style.pointerEvents = "none";

  carousel.classList.remove("next", "prev");
  let items = document.querySelectorAll(".carousel .list .item");
  if (type === "next") {
    listHTML.appendChild(items[0]);
    carousel.classList.add("next");
  } else {
    listHTML.prepend(items[items.length - 1]);
    carousel.classList.add("prev");
  }

  clearTimeout(unAcceppClick);
  unAcceppClick = setTimeout(() => {
    nextButton.style.pointerEvents = "auto";
    prevButton.style.pointerEvents = "auto";
  }, 2000);
};

let scrollTimeout;

// Scroll functionality
carousel.onwheel = function (e) {
  e.preventDefault();
  if (scrollTimeout) return;

  // Set a timeout to disable further scroll actions for 2 seconds
  scrollTimeout = setTimeout(() => {
    scrollTimeout = null; // Re-enable scroll after 2 seconds
  }, 1500);

  if (e.deltaY > 0) {
    showSlider("next");
  } else {
    showSlider("prev");
  }
};

backButton.style.display = "none";

seeMoreButtons.forEach((button) => {
  button.onclick = function () {
    carousel.classList.remove("next", "prev");
    carousel.classList.add("showDetail");

    backButton.style.opacity = "1";
    backButton.style.pointerEvents = "auto";
  };
});

backButton.onclick = function () {
  console.log("Back button clicked"); // Debugging
  carousel.classList.remove("showDetail");

  backButton.style.opacity = "0";
  backButton.style.pointerEvents = "none";
};
});
