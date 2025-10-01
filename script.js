const bildUrls = [
"imgs/2.jpg",
"imgs/3.jpg",
"imgs/10.jpg",
"imgs/4.jpg",
"imgs/5.jpg",
"imgs/17.jpg",
"imgs/8.jpg",
"imgs/9.jpg",
"imgs/14.jpg",
"imgs/12.jpg",
"imgs/13.jpg",
"imgs/15.jpg",
"imgs/16.jpg",
"imgs/19.jpg",
"imgs/20.jpg",
];



const bilderIcons = {
  close: "imgs/Close-red.png",
  prev: "imgs/left.png",
  next: "imgs/right-1.png"
};

const bilderContainer = document.getElementById("imgs-container");
let currentIndex = 0;
let lastFocusedElement = null;

// Bilder dynamisch ins HTML
bildUrls.forEach((url, index) => {
  const img = document.createElement("img");
  img.src = url;
  img.alt = `Fotogram Bild ${index + 1}`;
  img.tabIndex = 0;
  img.addEventListener("click", () => showPopup(index, img));
  bilderContainer.appendChild(img);
});

// Popup erstellen
const popup = document.createElement("div");
popup.classList.add("popup");
popup.setAttribute("role", "dialog");
popup.setAttribute("aria-modal", "true");
popup.style.display = "none";

const popupContent = document.createElement("div");
popupContent.classList.add("popup-content");

const popupImg = document.createElement("img");
popupImg.classList.add("popup-img");
popupContent.appendChild(popupImg);

popup.addEventListener("click", (i) => {
  if (i.target === popup) {
    closePopup();
  }
});

// Button schlißen
const closeBtn = document.createElement("button");
closeBtn.classList.add("popup-close");
closeBtn.setAttribute("aria-label", "Close popup");
closeBtn.innerHTML = `<img src="${bilderIcons.close}" alt="Close">`;
popupContent.appendChild(closeBtn);

// Kontrolle
const controls = document.createElement("div");
controls.classList.add("popup-controls");

const prevBtn = document.createElement("button");
prevBtn.classList.add("popup-prev");
prevBtn.setAttribute("aria-label", "Previous image");
prevBtn.innerHTML = `<img src="${bilderIcons.prev}" alt="Previous">`;
controls.appendChild(prevBtn);

const nextBtn = document.createElement("button");
nextBtn.classList.add("popup-next");
nextBtn.setAttribute("aria-label", "Next image");
nextBtn.innerHTML = `<img src="${bilderIcons.next}" alt="Next">`;
controls.appendChild(nextBtn);

popupContent.appendChild(controls);
popup.appendChild(popupContent);
document.body.appendChild(popup);

// Funktionen
function showPopup(index, triggerElement) {
  currentIndex = index;
  lastFocusedElement = triggerElement;
  popupImg.src = bildUrls[currentIndex];
  popup.style.display = "flex";
  closeBtn.focus();
}

function closePopup() {
  popup.style.display = "none";
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function showPrev() {
  currentIndex = (currentIndex - 1 + bildUrls.length) % bildUrls.length;
  popupImg.src = bildUrls[currentIndex];
}

function showNext() {
  currentIndex = (currentIndex + 1) % bildUrls.length;
  popupImg.src = bildUrls[currentIndex];
}

// Events
closeBtn.addEventListener("click", closePopup);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);



// Tastatursteuerung
document.addEventListener("keydown", (i) => {
  if (popup.style.display === "flex") { 
    if (i.key === "Escape") closePopup();
    if (i.key === "ArrowRight") showNext();
    if (i.key === "ArrowLeft") showPrev();
  }
});


