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
.addEventListener("click", () => {

    window.location.href = "edit-profile.html";

});

/* =========================
   Load User Details
========================= */

async function loadUserProfile(){

    try{

        const response = await fetch(
            `http://127.0.0.1:8000/user/${userId}`
        );

        if(!response.ok){

            throw new Error("Failed to load profile");

        }

        const user = await response.json();

    document.getElementById("profile-name").textContent =
        user.username;

    document.getElementById("profile-email").textContent =
        user.email;

    document.getElementById("profile-bio").textContent =
        user.bio || "No bio yet.";

    document.getElementById("username").textContent =
        user.username;

    document.getElementById("gender").textContent =
        user.gender || "—";

    document.getElementById("pronouns").textContent =
        user.pronouns || "—";

    document.getElementById("mbti").textContent =
        user.mbti || "—";

    document.getElementById("country").textContent =
        user.country || "—";

    document.getElementById("favorite-movie").textContent =
        user.favorite_movie || "None";

    document.getElementById("favorite-anime").textContent =
        user.favorite_anime || "None";

    document.getElementById("favorite-book").textContent =
        user.favorite_book || "None";

    document.getElementById("favorite-game").textContent =
        user.favorite_game || "None";

    if(user.profile_picture){

        document.getElementById("profile-picture").src =
            user.profile_picture;

    }

    const genreContainer =
        document.getElementById("genre-tags");

    genreContainer.innerHTML = "";

    if(user.favorite_genres){

        user.favorite_genres
            .split(",")

            .forEach(genre=>{

                const tag =
                    document.createElement("span");

                tag.className = "tag";

                tag.textContent =
                    genre.trim();

                genreContainer.appendChild(tag);

            });

    }

    }

    catch(error){

        console.error(error);

        alert("Couldn't load profile.");

    }

}

/* =========================
   Collection Stats
========================= */

let entries = [];

async function loadEntries(){

    try{

        const response = await fetch(
            `http://127.0.0.1:8000/entries/${userId}`
        );

        if(!response.ok){

            throw new Error("Failed to load entries");

        }

        entries = await response.json();

        updateStats();

        updateRecentActivity();

    }

    catch(error){

        console.error(error);

        alert("Couldn't load your collection.");

    }

}

loadUserProfile();

loadEntries();

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
            ${"⭐".repeat(entry.rating || 0)}
        `;

        container.appendChild(card);

    });

}