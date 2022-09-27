console.log("main");

let item = []
let cardsOnPage = 3
const hamLinks = document.querySelectorAll('.hamburger-nav-link')
const hamList = document.querySelector('.hamburger-nav-list')
const lines = document.querySelectorAll('.line')
const hambItem = document.getElementById('hamburger-item')
const hamb = document.getElementById("hamburger")
const sidebarHeader = document.querySelector(".sidebar-header")
const sidebarLogo = document.querySelector(".sidebar-logo")
const headerContainer = document.querySelector(".header-main-container")
const block = document.querySelector('.block')
const htmlD = document.getElementById('main')

function hiddenBurger() {
  hambItem.classList.remove("active")
  hamb.classList.remove("is-active")
  headerContainer.classList.remove("active")
  sidebarHeader.classList.remove("active")
  htmlD.classList.remove("active")
}

sidebarLogo.addEventListener('click', hiddenBurger)
block.addEventListener('click', hiddenBurger)

hamb.onclick = function () {
  hamb.classList.toggle("is-active")

  if (hamb.classList.contains("is-active")) {
    hambItem.classList.add("active")
    sidebarHeader.classList.add("active")
    headerContainer.classList.add("active")
    htmlD.classList.add("active")
  }
  else {
    hambItem.classList.remove("active")
    sidebarHeader.classList.remove("active")
    headerContainer.classList.remove("active")
    htmlD.classList.remove("active")
  }
}

hamLinks.forEach(link => link.addEventListener('click', hiddenBurger))

// add cards animals //

let cards
let globalData = []
let isLeft = ""

async function getPets() {
  const pets = '../pets.json';
  const res = await fetch(pets);
  globalData = await res.json();
  for (let i = 0; i < globalData.length; i++)
    item.push(i)
  item.sort(() => Math.random() - 0.5)
  addCards();
  console.log(globalData);
}
getPets();

const sliderItems = document.querySelector('.slider-items')

let screenWidth = window.innerWidth

function choosePage() {
  // screenWidth = htmlD.style.width
  if (screenWidth > 1279)
    cardsOnPage = 3
  else if (screenWidth < 768)
    cardsOnPage = 1
  else
    cardsOnPage = 2
}

function addCards() {
  choosePage();
  cards = document.querySelectorAll('.card');
  let isEmpty = cards.length ? 1 : 0
  if (isEmpty !== 0){
    cards.forEach(item => item.classList.add('inactive-slider'))
    if (isLeft !== "")
    cards.forEach(item => item.classList.add('left'))
  }
  let temp = item.splice(0, cardsOnPage)
  for (let i of temp) {
    let newCard = `
    <div class="card card-new ${isLeft}" data-id="${i}">
      <div class="pets-animal">
        <img src=${globalData[i].img} alt=${globalData[i].name}>
      </div>
      <span class="name">${globalData[i].name}</span>
      <button class="button-secondary btn">
        Learn more
      </button> 
    </div>
  `
    sliderItems.insertAdjacentHTML('beforeend', newCard);
  }

  if (isEmpty === 0) {
    let newCards = document.querySelectorAll('.card-new')
    newCards.forEach(item => item.classList.remove('card-new'))
  }

  cards = document.querySelectorAll('.card-new');
  cards.forEach(item => item.classList.remove('inactive-slider'))
  cards.forEach(item => item.addEventListener('click', showModalWindows))

  setInterval(() => {
    let tempArr = document.querySelectorAll('.inactive-slider')
    tempArr.forEach(item => sliderItems.removeChild(item))
    cards.forEach(item => item.classList.remove('card-new'))
    if (isLeft !== "")
    cards.forEach(item => item.classList.remove('left'))
  }, 2000)

  item.sort(() => Math.random() - 0.5)
  for (let i = 0; i < cardsOnPage; i++)
    item.push(temp[i])
  console.log(item)

  cards = document.querySelectorAll('.card');
  cards.forEach(item => item.addEventListener('click', showModalWindows))
}

// modal windows

const modalWindow = document.querySelector('.window')
const closeModalBtn = document.querySelector('.close-modal-btn')
const modalWindowWrapper = document.querySelector('.modal-window-wrapper')
const modalWindowMain = document.querySelector('.modal-window')

function closeModal (){
  htmlD.classList.remove("active")
  modalWindowMain.classList.remove("active")
  modalWindowWrapper.style.display = 'none';
  modalWindow.classList.remove("active")
}

closeModalBtn.addEventListener('click',closeModal)
modalWindowWrapper.addEventListener('click',closeModal)
modalWindowMain.addEventListener('click',closeModal)

function showModalWindows() {
  modalWindowWrapper.style.display = 'flex';
  htmlD.classList.add("active")
  modalWindowMain.classList.add("active")
  modalWindow.innerHTML = '';
  modalWindow.classList.add("active")
    const newCard = `
    <div class="pets-animal-modal">
        <img src="${globalData[this.dataset.id].img}" alt=${globalData[this.dataset.id].name}>
    </div>
    <div class="content">
        <h3 class="name-modal">${globalData[this.dataset.id].name}</h3>
        <h4 class="breed">${globalData[this.dataset.id].type} - ${globalData[this.dataset.id].breed}</h4>
        <span class="description">${globalData[this.dataset.id].description}</span>
        <ul class="list-modal">
            <li class="list-item"><span class="type-item">Age:</span>${globalData[this.dataset.id].age}</li>
            <li class="list-item"><span class="type-item">Inoculations:</span> ${globalData[this.dataset.id].inoculations}</li>
            <li class="list-item"><span class="type-item">Diseases:</span> ${globalData[this.dataset.id].diseases}</li>
            <li class="list-item"><span class="type-item">Parasites:</span> ${globalData[this.dataset.id].parasites}</li>
        </ul>
    </div>
`
  modalWindow.insertAdjacentHTML('beforeend', newCard);
}

//carousel

const nextCard = document.querySelector('.next');
const previousCard = document.querySelector('.previous');



nextCard.addEventListener('click', function() {
  isLeft = "left"
  addCards()} );
previousCard.addEventListener('click', function() {
  isLeft = ""
  addCards()} );
