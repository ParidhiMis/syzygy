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


let allEntries = [];

async function loadEntries(){

    const response = await fetch(
        `http://127.0.0.1:8000/entries/${userId}`
    );

    allEntries = await response.json();

    displayEntries();

}

loadEntries();

function displayEntries(){

    const container =
        document.getElementById("entries-container");

    container.innerHTML = "";

    const selectedDate =
        localStorage.getItem("selectedDate");

    const filtered =
        allEntries.filter(entry =>
            entry.start_date === selectedDate
        );

    if(filtered.length===0){

        container.innerHTML =
            "<p>No entries for this day.</p>";

        return;

    }

    filtered.forEach(entry=>{

        const card=document.createElement("div");

        card.className="entry-card";

        card.innerHTML=`

            <h3>${entry.title}</h3>

            <p>${entry.media_type}</p>

            <p>Status: ${entry.status}</p>

            <p>⭐ ${entry.rating ?? "-"}</p>

            <p>${entry.review ?? ""}</p>

        `;

        container.appendChild(card);

    });

}

const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {

    localStorage.clear();

    window.location.href = "login.html";

});

const profileBtn = document.getElementById("profile-btn");

profileBtn.addEventListener("click", () => {

    window.location.href = "profile.html";

});