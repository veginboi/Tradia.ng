/////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTS FROM BUYER PAGE
/////////////////////////////////////////////////////////////////////////////////////////////////////////

import { 
  navlinks, 
  sections, 
  viewMap, 
  main, 
  drop, 
  balanceV, 
  balance, 
  hToggle, 
  tglBtn, 
  note, 
  balanceBtn, 
  cartSidebar, 
  sellerSidebar, 
  collapseCart, 
  collapseSeller,
  market,
  marketSidebars
} from "./buyer.js";


let mapInitialized = false; // track if map is already created

function activateSection(targetId) {
  // Remove active from all sections
  sections?.forEach(s => s.classList.remove("active"));

  // Activate the target section
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.classList.add("active");
    sessionStorage.setItem("activeSection", targetId);
  }

  // Remove active from all header nav links
  navlinks?.forEach(l => l.classList.remove("active"));

  // Remove active from all Sidebar  links
  sideBarLink?.forEach(l => l.classList.remove("sActive"));

  // Find the header nav link that points to the section and activate it
  const headerNav = Array.from(navlinks || []).find(
    l => l.getAttribute("data-target") === targetId
  );
  if (headerNav) {
    headerNav.classList.add("active");
  }

  // Find the SideBar Btn link that points to the section and activate it
  const sideBar = Array.from(sideBarLink || []).find(
    l => l.getAttribute("data-target") === targetId
  );
  if (sideBar) {
    sideBar.classList.add("sActive");
  }

  // Adjust viewMap
  viewMap?.forEach(v => {
    v.style.opacity = targetId === "market" ? "0" : "1";
  });

  // ✅ Initialize map only when Market section is activated
  if (targetId === "market" && !mapInitialized) {
    initMarketMap();
    mapInitialized = true;
  }
}

// Attach event listeners to ALL buttons/links (header + others)
document.querySelectorAll("[data-target]").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute("data-target");
    activateSection(targetId);
  });
});

// Restore last active section on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedSection = sessionStorage.getItem("activeSection");

  if (savedSection && document.getElementById(savedSection)) {
    activateSection(savedSection);
  } else {
    const defaultActive = document.querySelector(".section.active");
    if (defaultActive) {
      activateSection(defaultActive.id);
    }
  }
});

// ✅ Market Map Setup
function initMarketMap() {
  const map = L.map("marketMap").setView([0, 0], 2);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Locate user
  map.locate({ setView: true, maxZoom: 16 });

  // Found location
  map.on("locationfound", (e) => {
    const radius = e.accuracy;

    L.marker(e.latlng)
      .addTo(map)
      .bindPopup("You are here within " + Math.round(radius) + " meters")
      .openPopup();

    L.circle(e.latlng, radius).addTo(map);
  });

  // Location error
  map.on("locationerror", () => {
    alert("Location access denied. Showing default map.");
  });

  // Try to get location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        // Center map on your location
        map.setView([lat, lng], 14);

        // Add marker
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup("📍 You are here!")
          .openPopup();
      },
      (err) => {
        console.error("Geolocation error:", err.message);
        alert("Could not get your location. Please check browser permissions.");
      }
    );
  } else {
    alert("Geolocation not supported in this browser.");
  }
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUYER INTERACTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////

// For Every drop (Collapsible)
drop?.forEach(d => {
  d.addEventListener("click", () => {
    d.classList.toggle("toggle-drop");
  });
});

// For balance visibility (Buyer Wallet)
if (balanceBtn && balance && balanceV) {
  balanceBtn.addEventListener("click", () => {
    if (balanceV.getAttribute("src") === "assets/icons/eye-slash-fill.svg") {
      balance.textContent = "********";
      balanceV.setAttribute("src", "assets/icons/outlined.svg");
    } else {
      balance.textContent = "17,899.72";
      balanceV.setAttribute("src", "assets/icons/eye-slash-fill.svg");
    }
  });
}


// For Toggle History
hToggle?.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("toggle-drop");

    const container = btn.closest(".history-container");
    if (!container) return;

    const initial = container.querySelector(".initial");
    const moreDetail = container.querySelector(".more-detail");

    if (initial && moreDetail) {
      if (initial.style.display !== "none") {
        initial.style.display = "none";
        moreDetail.style.display = "flex";
      } else {
        moreDetail.style.display = "none";
        initial.style.display = "flex";
      }
    }
  });
});

// For Toggle Notification
note?.forEach(n => {
  n.addEventListener("click", () => {
    if (n.getAttribute("src") === "assets/icons/tgl-icon-off.svg") {
      n.setAttribute("src", "assets/icons/tgl-icon-on.svg");
    } else {
      n.setAttribute("src", "assets/icons/tgl-icon-off.svg");
    }
  });
});


// Toggle Market SiderBars
if(cartSidebar && sellerSidebar){

// Toggle Left Sidebar
collapseCart.addEventListener("click", () => {
  if(window.innerWidth <= 768 && cartSidebar.classList.contains("collapsed")){
    cartSidebar.classList.remove("collapsed");
    sellerSidebar.classList.add("collapsed");
  } else{
    // Toggle Left Sidebar
    cartSidebar.classList.toggle("collapsed");
  }
});

// Toggle Right Sidebar
collapseSeller.addEventListener("click", () => {
  if(window.innerWidth <= 768 && sellerSidebar.classList.contains("collapsed")){
    sellerSidebar.classList.remove("collapsed");
    cartSidebar.classList.add("collapsed");
  } else{
    // Toggle Right Sidebar
    sellerSidebar.classList.toggle("collapsed");
  }
});

// Toggle Minimize Both Sidebar(Cart & Categories)
market.addEventListener("click", () => {
  marketSidebars.forEach(s => {
    s.classList.add("collapsed")
  });
})
}





/////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTS FROM SELLER PAGE
/////////////////////////////////////////////////////////////////////////////////////////////////////////

import { 
  dashBoardBtn, 
  dashboardMoreInfo, 
  exitMoreInfo, 
  sideBarLink, 
  slides, 
  prevBtn, 
  nextBtn, 
  prevSlide, 
  nextSlide, 
  productContent, 
  addCate, 
  cardNextBtn, 
  cardPrevBtn, 
  cards, 
  calendarEl, 
  sellerWallet, 
  sellerBalance,
  sellerBalanceBtn,
  sellerBalanceV } from "./seller.js";

// Seller dashboard toggle
if (dashBoardBtn && dashboardMoreInfo && exitMoreInfo) {
  dashBoardBtn.addEventListener("click", () => {
    dashboardMoreInfo.forEach(s => {
        s.style.display = "block"
    });
  });

  exitMoreInfo.addEventListener("click", () => {
    dashboardMoreInfo.forEach(s => {
        console.log(s)
        s.style.display = "none";
    });
  });
}


// Order Section Slides Changer
if(prevBtn && nextBtn){
    prevBtn.addEventListener("click", () => prevSlide(slides));
    nextBtn.addEventListener("click", () => nextSlide(slides));
}


// Product Section Add Category

if(productContent && addCate){
  addCate.addEventListener("click", ()=>{
    productContent.innerHTML += `
    
                                        <!-- Category -->
                                        <div class="d-flex p-2 justify-content-between align-items-center w-100 bg-white rounded-4 category">

                                            <!-- Category Name -->
                                            <div class="d-flex gap-2 align-items-center">
                                                <span style="width: 200px; font-size: 14px;font-weight: 600; color: #004494;">Category Name</span>
                                            </div>

                                            <!-- View Category Btn -->
                                            <button class="sec-btn" style="border: 1px solid #004494; border-radius: 20px;">View Category</button>

                                            <!-- Add Product Btn -->
                                            <div class="d-flex align-items-center gap-2">
                                                <button class="pri-btn" style="border: 1px solid #004494; border-radius: 20px;">Add Product</button>
                                            </div>
                                        </div>
    `
  })
}



// Analytic Total Sales Card Period

if(cardNextBtn && cardPrevBtn && cards){
  cardPrevBtn.addEventListener("click", () => prevSlide(cards));
  cardNextBtn.addEventListener("click", () => nextSlide(cards));
}


// if(calendarEl){
//   document.addEventListener('DOMContentLoaded', function() {
//     calendarEl = document.getElementById('calendar');
//     let calendar = new FullCalendar.Calendar(calendarEl, {
//       initialView: 'dayGridMonth'
//     });
//     calendar.render();
//   });
// }

// For balance visibility (Seller Wallet)
if ( sellerWallet ) {
  sellerBalanceBtn.addEventListener("click", () => {
    if (sellerBalanceV.getAttribute("src") === "assets/icons/eye-slash-fill.svg") {
      sellerBalance.textContent = "********";
      sellerBalanceV.setAttribute("src", "assets/icons/outlined.svg");
    } else {
      sellerBalance.textContent = "213,300.45";
      sellerBalanceV.setAttribute("src", "assets/icons/eye-slash-fill.svg");
    }
  });
}


