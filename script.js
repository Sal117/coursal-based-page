jQuery(document).ready(function($) {
    const carousel      = document.querySelector(".carousel");
    const listHTML      = document.querySelector(".carousel .list");
    const nextButton    = document.getElementById("next");
    const prevButton    = document.getElementById("prev");
    const backButton    = document.getElementById("back");
    const seeMoreButtons= document.querySelectorAll(".seeMore");
  
    // Initially hide Back button
    backButton.style.display = "none";
  
    // ------ EVENT: Show detail when "See More" is clicked ------
    seeMoreButtons.forEach((btn) => {
      btn.addEventListener("click", function() {
        // Enter "showDetail" mode
        carousel.classList.add("showDetail");
  
        // Hide all big-cards first
        const allBigCards = document.querySelectorAll(".big-card");
        allBigCards.forEach((card) => (card.style.display = "none"));
  
        // Show only the big-card of the clicked item
        const parentItem = btn.closest(".item");
        const bigCard    = parentItem.querySelector(".big-card");
        if (bigCard) bigCard.style.display = "block";
  
        // Show back button
        backButton.style.display       = "block";
        backButton.style.opacity       = "1";
        backButton.style.pointerEvents = "auto";
      });
    });
  
    // ------ EVENT: Back button -> hide detail and revert to normal carousel ------
    backButton.addEventListener("click", () => {
        console.log("Back button clicked!"); // For debugging
    
        // Remove detail mode
        carousel.classList.remove("showDetail");
    
        // Hide all big-cards
        document.querySelectorAll(".big-card").forEach((card) => {
          card.style.display = "none";
        });
    
        // Fade out the Back button
        backButton.style.opacity = "0";
        backButton.style.pointerEvents = "none";
        setTimeout(() => {
          backButton.style.display = "none";
        }, 300);
      });
    
  
    // ------ Carousel next/prev arrows ------
    nextButton.onclick = () => showSlider("next");
    prevButton.onclick = () => showSlider("prev");
  
    let unAcceppClick; // to block double-clicks for ~2s
    function showSlider(direction) {
      // Temporarily disable the arrow buttons
      nextButton.style.pointerEvents = "none";
      prevButton.style.pointerEvents = "none";
  
      carousel.classList.remove("next", "prev");
      let items = listHTML.querySelectorAll(".item");
  
      if (direction === "next") {
        // Move the first item to the end
        listHTML.appendChild(items[0]);
        carousel.classList.add("next");
      } else {
        // Move the last item to the front
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add("prev");
      }
  
      // If we are in detail mode, show the newly "active" item's big-card
      if (carousel.classList.contains("showDetail")) {
        const allBigCards = document.querySelectorAll(".big-card");
        allBigCards.forEach((card) => (card.style.display = "none"));
  
        // The "active" item is typically .item:nth-child(2)
        const currentActiveItem = listHTML.querySelector(".item:nth-child(2)");
        if (currentActiveItem) {
          const currentBigCard = currentActiveItem.querySelector(".big-card");
          if (currentBigCard) currentBigCard.style.display = "block";
        }
      }
  
      // Re-enable the arrow buttons after 2s
      clearTimeout(unAcceppClick);
      unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = "auto";
        prevButton.style.pointerEvents = "auto";
      }, 2000);
    }
  
    // ------ Mouse Wheel Scroll for next/prev ------
    let scrollTimeout;
    carousel.onwheel = function(e) {
      e.preventDefault();
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
      }, 1500);
  
      if (e.deltaY > 0) {
        showSlider("next");
      } else {
        showSlider("prev");
      }
    };
  });
  
