const userId = localStorage.getItem("userId");

if (!userId) {

    window.location.href = "login.html";

}

// Sidebar
const menuBtn = document.getElementById("menu-btn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");

    menuBtn.classList.toggle("active");

});


// Calendar
const calendarBtn = document.getElementById("calendar-btn");
const calendarPanel = document.querySelector(".calendar-panel");

calendarBtn.addEventListener("click", () => {

    calendarPanel.classList.toggle("hidden");

    if(calendarPanel.classList.contains("hidden")){

        calendarBtn.style.left = "20px";

    }
    else{

        calendarBtn.style.left = "390px";

    }

});

calendarBtn.style.left = "390px";


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

    }else{

        searchInput.value="";

        searchInput.dispatchEvent(new Event("input"));

    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        searchContainer.classList.remove("active");

        searchInput.value="";

        searchInput.dispatchEvent(new Event("input"));

    }

});

document.addEventListener("click",(e)=>{

    if(!searchContainer.contains(e.target)){

        searchContainer.classList.remove("active");

        searchInput.value="";

        searchInput.dispatchEvent(new Event("input"));

    }

});

searchContainer.addEventListener("click",(e)=>{

    e.stopPropagation();

});

