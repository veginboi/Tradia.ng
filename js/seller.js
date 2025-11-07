const dashBoardBtn = document.querySelector(".dashboardBtn");
const dashboardMoreInfo = document.querySelectorAll(".dashboardMoreInfo");
const exitMoreInfo = document.querySelector(".exitMoreInfo")
const sideBarLink = document.querySelectorAll(".sidebar-link");
const slides = document.querySelectorAll(".orderSlide");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const productContent = document.querySelector(".productContent");
const addCate = document.querySelector(".addCategory");
const cardPrevBtn = document.querySelector(".cardPrevBtn");
const cardNextBtn = document.querySelector(".cardNextBtn");
const cards = document.querySelectorAll(".salesCard");
const calendarEl = document.getElementById("calendar");
const sellerWallet = document.getElementById("wallet");
const sellerBalanceBtn = document.querySelector("#seller-balanceBtn");
const sellerBalanceV = document.querySelector("#seller-balance-visibility");
const sellerBalance = document.querySelector("#seller-balance");

let currentIndex = 0;

export function showSlide(index, slides){

        nextBtn.style.display = "block";
        prevBtn.style.display = "block";
        cardNextBtn.style.display = "block";
        cardPrevBtn.style.display = "block";

    if (index < 0 || index >= slides.length) {
    return;
  }
   slides[currentIndex].classList.remove("orderActive");
   slides[index].classList.add("orderActive");
   currentIndex = index;
}
export function prevSlide(slides){
    if(currentIndex > 0) showSlide((currentIndex -1), slides);
    if(currentIndex === 0) {
        nextBtn.style.display = "block";
        prevBtn.style.display = "none";
        cardNextBtn.style.display = "block";
        cardPrevBtn.style.display = "none";
    }
}
export function nextSlide(slides){
    if(currentIndex < slides.length -1) showSlide((currentIndex +1), slides);
    if(currentIndex === slides.length -1) {
        nextBtn.style.display = "none";
        prevBtn.style.display = "block";
        cardNextBtn.style.display = "none";
        cardPrevBtn.style.display = "block";
    }
}

export{ 
    dashBoardBtn,
    dashboardMoreInfo, 
    exitMoreInfo, 
    sideBarLink,
    slides,
    prevBtn,
    nextBtn,
    productContent,
    addCate,
    cardNextBtn,
    cardPrevBtn,
    cards,
    calendarEl,
    sellerWallet,
    sellerBalance,
    sellerBalanceBtn,
    sellerBalanceV
}