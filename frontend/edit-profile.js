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

    window.location.href="profile.html";

});

/* =========================
   Load Profile
========================= */

async function loadProfile(){

    try{

        const response = await fetch(
            `http://127.0.0.1:8000/user/${userId}`
        );

        if(!response.ok){

            throw new Error("Couldn't load profile");

        }

        const user = await response.json();

        document.getElementById("username").value =
            user.username || "";

        document.getElementById("bio").value =
            user.bio || "";

        document.getElementById("gender").value =
            user.gender || "";

        document.getElementById("pronouns").value =
            user.pronouns || "";

        document.getElementById("mbti").value =
            user.mbti || "";

        document.getElementById("country").value =
            user.country || "";

        document.getElementById("favorite-genres").value =
            user.favorite_genres || "";

        document.getElementById("favorite-movie").value =
            user.favorite_movie || "";

        document.getElementById("favorite-anime").value =
            user.favorite_anime || "";

        document.getElementById("favorite-book").value =
            user.favorite_book || "";

        document.getElementById("favorite-game").value =
            user.favorite_game || "";

        document.getElementById("profile-picture").value =
            user.profile_picture || "";

        if(user.profile_picture){

            document.getElementById("profile-picture-preview").src =
                user.profile_picture;

        }

    }

    catch(error){

        console.error(error);

        alert("Couldn't load profile.");

    }

}

loadProfile();

/* =========================
   Live Picture Preview
========================= */

const pictureInput =
    document.getElementById("profile-picture");

pictureInput.addEventListener("input",()=>{

    const url = pictureInput.value.trim();

    if(url){

        document.getElementById("profile-picture-preview").src =
            url;

    }

});

/* =========================
   Save Profile
========================= */

document
.getElementById("save-btn")
.addEventListener("click",saveProfile);

async function saveProfile(){

    const profile = {

        username:
            document.getElementById("username").value,

        bio:
            document.getElementById("bio").value,

        gender:
            document.getElementById("gender").value,

        pronouns:
            document.getElementById("pronouns").value,

        mbti:
            document.getElementById("mbti").value,

        country:
            document.getElementById("country").value,

        favorite_genres:
            document.getElementById("favorite-genres").value,

        favorite_movie:
            document.getElementById("favorite-movie").value,

        favorite_anime:
            document.getElementById("favorite-anime").value,

        favorite_book:
            document.getElementById("favorite-book").value,

        favorite_game:
            document.getElementById("favorite-game").value,

        profile_picture:
            document.getElementById("profile-picture").value

    };

    try{

        const response = await fetch(

            `http://127.0.0.1:8000/user/${userId}`,

            {

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(profile)

            }

        );

        if(!response.ok){

            throw new Error("Failed to save profile");

        }

        alert("Profile updated successfully!");

        window.location.href="profile.html";

    }

    catch(error){

        console.error(error);

        alert("Couldn't save profile.");

    }

}