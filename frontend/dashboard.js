const userId = localStorage.getItem("userId");
const filterBtn = document.getElementById("filter-btn");
const filterPanel = document.getElementById("filter-panel");

if (!userId) {

    window.location.href = "login.html";

}

// Sidebar
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

document
.getElementById("profile-sidebar")
.addEventListener("click", () => {

    window.location.href = "profile.html";

});

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");
    menuBtn.classList.toggle("active");

    if(sidebar.classList.contains("open")){

        searchContainer.classList.remove("active");

        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"));

        filterBtn.style.display = "none";
        filterPanel.classList.remove("open");

    }

});


// Calendar
const calendarBtn = document.getElementById("calendar-btn");
const calendarPanel = document.querySelector(".calendar-panel");

const center = document.querySelector(".center");

calendarBtn.addEventListener("click", () => {

    calendarPanel.classList.toggle("hidden");
    calendarBtn.classList.toggle("closed");
    center.classList.toggle("expanded");

});

// Greeting
const welcomeText = document.getElementById("welcome-text");

const currentUser = localStorage.getItem("currentUser");

welcomeText.innerText = currentUser ? `Hey, ${currentUser}` : "Hey!";


// Plus button
document.getElementById("plus-btn").addEventListener("click", ()=>{

    window.location.href="entry.html";

});


const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

const profileBtn = document.getElementById("profile-btn");

profileBtn.addEventListener("click", () => {

    window.location.href = "profile.html";

});

const searchContainer = document.querySelector(".search-container");

const searchBtn = document.getElementById("search-btn");

const searchInput = document.getElementById("search-input");

searchBtn.addEventListener("click",()=>{

    searchContainer.classList.toggle("active");

    if(searchContainer.classList.contains("active")){

        searchInput.focus();

        filterBtn.style.display = "flex";

    }else{

        searchInput.value="";

        searchInput.dispatchEvent(new Event("input"));

        filterBtn.style.display = "none";

        filterPanel.classList.remove("open");

    }

});

const clearFilters = document.getElementById("clear-filters");


document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        searchContainer.classList.remove("active");

        searchInput.value="";

        searchInput.dispatchEvent(new Event("input"));

        filterBtn.style.display = "none";

        filterPanel.classList.remove("open");

    }

});

document.addEventListener("click",(e)=>{

    if(
        !searchContainer.contains(e.target) &&
        !filterPanel.contains(e.target)
    ){

        searchContainer.classList.remove("active");

        searchInput.value="";

        searchInput.dispatchEvent(new Event("input"));

        filterBtn.style.display="none";

        filterPanel.classList.remove("open");

    }

});

searchContainer.addEventListener("click",(e)=>{

    e.stopPropagation();

});

filterBtn.addEventListener("click",(e)=>{

    e.stopPropagation();

    filterPanel.classList.toggle("open");

});

filterPanel.addEventListener("click",(e)=>{

    e.stopPropagation();

});