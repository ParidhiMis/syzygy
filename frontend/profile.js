const userId = localStorage.getItem("userId");

if(!userId){

    window.location.href = "login.html";

}

/* =========================
   Back Button
========================= */

document
.getElementById("back-btn")
.addEventListener("click",()=>{

    window.location.href = "dashboard.html";

});

/* =========================
   Edit Button
========================= */

document
.getElementById("edit-profile-btn")
.addEventListener("click",()=>{

    alert("Edit Profile page coming soon!");

});

/* =========================
   Load User Details
========================= */

const username =
    localStorage.getItem("currentUser") || "Guest";

const email =
    localStorage.getItem("email") || "No email added";

const bio =
    localStorage.getItem("bio") ||
    "No bio yet.";

const gender =
    localStorage.getItem("gender") || "—";

const pronouns =
    localStorage.getItem("pronouns") || "—";

const mbti =
    localStorage.getItem("mbti") || "—";

const country =
    localStorage.getItem("country") || "—";

const picture =
    localStorage.getItem("profilePicture");

document.getElementById("profile-name").textContent = username;

document.getElementById("profile-email").textContent = email;

document.getElementById("profile-bio").textContent = bio;

document.getElementById("username").textContent = username;

document.getElementById("gender").textContent = gender;

document.getElementById("pronouns").textContent = pronouns;

document.getElementById("mbti").textContent = mbti;

document.getElementById("country").textContent = country;

if(picture){

    document.getElementById("profile-picture").src = picture;

}

/* =========================
   Genres
========================= */

const genres =
    JSON.parse(localStorage.getItem("genres")) || [];

const genreContainer =
    document.getElementById("genre-tags");

genreContainer.innerHTML = "";

genres.forEach(genre=>{

    const tag = document.createElement("span");

    tag.className = "tag";

    tag.textContent = genre;

    genreContainer.appendChild(tag);

});

/* =========================
   Favorites
========================= */

document.getElementById("favorite-movie").textContent =
    localStorage.getItem("favoriteMovie") || "None";

document.getElementById("favorite-anime").textContent =
    localStorage.getItem("favoriteAnime") || "None";

document.getElementById("favorite-book").textContent =
    localStorage.getItem("favoriteBook") || "None";

document.getElementById("favorite-game").textContent =
    localStorage.getItem("favoriteGame") || "None";

/* =========================
   Collection Stats
========================= */

let entries = [];

async function loadProfile(){

    const response = await fetch(
        `http://127.0.0.1:8000/entries/${userId}`
    );

    entries = await response.json();

    updateStats();

    updateRecentActivity();

}

loadProfile();

function updateStats(){

    document.getElementById("movie-count").textContent =
        entries.filter(e=>e.media_type==="Movie").length;

    document.getElementById("series-count").textContent =
        entries.filter(e=>e.media_type==="Series").length;

    document.getElementById("anime-count").textContent =
        entries.filter(e=>e.media_type==="Anime").length;

    document.getElementById("book-count").textContent =
        entries.filter(e=>e.media_type==="Book").length;

    document.getElementById("game-count").textContent =
        entries.filter(e=>e.media_type==="Game").length;

    const rated =
        entries.filter(e=>e.rating>0);

    let avg = 0;

    if(rated.length){

        avg =
            rated.reduce((sum,e)=>sum+e.rating,0) /
            rated.length;

    }

    document.getElementById("average-rating").textContent =
        avg.toFixed(1);

}

/* =========================
   Recent Activity
========================= */

function updateRecentActivity(){

    const container =
        document.getElementById("recent-activity");

    container.innerHTML = "";

    const recent =
        [...entries].reverse().slice(0,5);

    recent.forEach(entry=>{

        const card = document.createElement("div");

        card.className = "favorite-item";

        card.innerHTML = `
            <strong>${entry.title}</strong><br>
            ${entry.media_type} •
            ${entry.status}<br>
            ${"⭐".repeat(entry.rating)}
        `;

        container.appendChild(card);

    });

}