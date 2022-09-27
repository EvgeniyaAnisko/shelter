console.log('pets')

let item = []
let pages;
let page = 0;

const hamLinks = document.querySelectorAll('.hamburger-nav-link')
const hamList = document.querySelector('.hamburger-nav-list')
const lines = document.querySelectorAll('.line')
const hambItem = document.getElementById('hamburger-item')
const hamb = document.getElementById("hamburger")
const sidebarHeader = document.querySelector(".sidebar-header")
const sidebarLogo = document.querySelector(".sidebar-logo")
const headerContainer = document.querySelector(".header-pets-container")
const block = document.querySelector('.block')
const htmlD = document.getElementById('pets')

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

async function getPets() {
  const pets = '../pets.json';
  const res = await fetch(pets);
  globalData = await res.json();
  choosePage()
  if (pages === 6) {
    for (let j = 0; j < pages; j++) {
      let temp = []
      for (let i = 0; i < globalData.length; i++) {
        temp.push(i)
      }
      temp.sort(() => Math.random() - 0.5)
      item.push(temp)
    }
  }
  else {
    let temp3 = []
    for (let i = 0; i < globalData.length; i++) {
      temp3.push(i)
    }
    temp3.sort(() => Math.random() - 0.5)
    console.log(temp3)
    let temp2 = []
    for (let i = 0; i < pages; i++){
      
      for (let j = 0; j<temp3.length; j++){
        temp2.push(temp3[j])
      }
    }

    for (let i = 0; i < pages; i++){
      let temp = []
      for (let j = 0; j<48/pages; j++){
        temp.push(temp2.shift())
      }
      item.push(temp)
    }
  }  
 
  console.log(item)
  addCards();
  console.log(globalData);
}
getPets();

const sliderItems = document.querySelector('.slider-items')

function addCards() {
  sliderItems.innerHTML = '';
  for (let i of item[page]){
    const newCard = `
  <div class="card" data-id="${i}">
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

//pagination
function disabledLeftBtn(){
  previousBtn.setAttribute("disabled", "true");
    startBtn.setAttribute("disabled", "true");
}

function disabledRighBtn(){
  nextBtn.setAttribute("disabled", "true");
  finishBtn.setAttribute("disabled", "true");
}

function removeDisabledLeftBtn(){
  previousBtn.removeAttribute("disabled");
  startBtn.removeAttribute("disabled");
}

function removeDisabledRightBtn(){
  nextBtn.removeAttribute("disabled");
  finishBtn.removeAttribute("disabled");
}

let screenWidth = window.innerWidth
console.log(screenWidth)

const startBtn = document.querySelector('.start')

function firstPage() {
  page = 0
  paginationBtn.innerHTML = ''
  paginationBtn.innerHTML =  page+1
  addCards()
  disabledLeftBtn()
  removeDisabledRightBtn()
}

startBtn.addEventListener('click', firstPage)

const previousBtn = document.querySelector('.previous')

function previousPage (){
  if (page === 0)
    return;
  paginationBtn.innerHTML = ''
  page--
  if (page === 0)
    disabledLeftBtn()
  paginationBtn.innerHTML =  page+1
  removeDisabledRightBtn()
  addCards()
}

previousBtn.addEventListener('click',previousPage) 

const nextBtn =document.querySelector('.next')

function nextPage (){
  if (page === pages-1)
    return;
  paginationBtn.innerHTML = ''
  page++
  if (page === pages-1)
    disabledRighBtn()
  paginationBtn.innerHTML =  page+1
  removeDisabledLeftBtn()
  addCards()
}

nextBtn.addEventListener('click',nextPage) 

const finishBtn = document.querySelector('.end')

function lastPage() {
  page = pages-1
  paginationBtn.innerHTML = ''
  paginationBtn.innerHTML =  page+1
  addCards()
  disabledRighBtn()
  removeDisabledLeftBtn()
}

finishBtn.addEventListener('click', lastPage)

const paginationBtn = document.querySelector('.page')

function choosePage(){
  // screenWidth = window.innerWidth
  if (screenWidth >1279)
    pages = 6
  else if (screenWidth <=767)
    pages = 16
    else
    pages = 8
}
