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

        calendarBtn.innerHTML = "❯";

    }
    else{

        calendarBtn.innerHTML = "❮";

    }

});


// Greeting
const welcomeText = document.getElementById("welcome-text");

const currentUser = localStorage.getItem("currentUser");

welcomeText.innerText = currentUser ? `Hey, ${currentUser}` : "Hey!";


// Plus button
document.getElementById("plus-btn").addEventListener("click", ()=>{

    window.location.href="entry.html";

});