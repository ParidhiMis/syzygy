const userId = localStorage.getItem("userId");

if (!userId) {

    window.location.href = "login.html";

}


const stars = document.querySelectorAll(".star");
const form = document.getElementById("entry-form");

const status = document.getElementById("status");

const startGroup = document.getElementById("start-group");
const finishGroup = document.getElementById("finish-group");

let rating = 0;

const editEntryId = localStorage.getItem("editEntryId");

const isEditMode = !!editEntryId;

const pageTitle = document.getElementById("page-title");

pageTitle.innerText = editEntryId ? "Edit Entry" : "Add New Entry";

if(editEntryId){
    loadEntry();
}

const subtitle = document.getElementById("entry-subtitle");
const saveBtn = document.getElementById("save-btn");

if(isEditMode){

    pageTitle.textContent = "Edit Entry";
    subtitle.textContent = "Update details for this entry.";
    saveBtn.textContent = "Save Changes";

}else{

    pageTitle.textContent = "Add Entry";
    subtitle.textContent = "What did you discover today?";
    saveBtn.textContent = "Save Entry";

}


document
.getElementById("cancel-btn")
.addEventListener("click", () => {

    localStorage.removeItem("editEntryId");
    window.location.href = "dashboard.html";

});

/* ---------- STAR RATING ---------- */

stars.forEach((star)=>{

    star.addEventListener("click",()=>{

        rating = Number(star.dataset.value);

        stars.forEach((s)=>{

            if(Number(s.dataset.value)<=rating){

                s.classList.add("active");

            }

            else{

                s.classList.remove("active");

            }

        });

    });

});


/* ---------- STATUS ---------- */

function updateDates(){

    const current = status.value;

    if(current==="Planned"){

        startGroup.style.display="none";
        finishGroup.style.display="none";

    }

    else if(current==="Watching"){

        startGroup.style.display="block";
        finishGroup.style.display="none";

    }

    else{

        startGroup.style.display="block";
        finishGroup.style.display="block";

    }

}

updateDates();

status.addEventListener("change",updateDates);

async function loadEntry(){

    const response = await fetch(
        `http://127.0.0.1:8000/entry/${editEntryId}`
    );

    const entry = await response.json();

    document.getElementById("title").value = entry.title;

    document.getElementById("media-type").value = entry.media_type;

    status.value = entry.status;

    document.getElementById("review").value =
        entry.review || "";

    document.getElementById("start-date").value =
        entry.start_date || "";

    document.getElementById("finish-date").value =
        entry.finish_date || "";

    rating = entry.rating;

    stars.forEach(star=>{

        if(Number(star.dataset.value)<=rating){

            star.classList.add("active");

        }

    });

    updateDates();

}

/* ---------- SAVE ENTRY ---------- */

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const userId = localStorage.getItem("userId");

    const entry={

        title:document.getElementById("title").value,

        media_type:document.getElementById("media-type").value,

        status:status.value,

        rating:rating,

        review:document.getElementById("review").value,

        start_date:document.getElementById("start-date").value || null,

        finish_date:document.getElementById("finish-date").value || null,

        user_id:Number(userId)

    };

    try{

        let url = "http://127.0.0.1:8000/entry";

        let method = "POST";

        if(editEntryId){

            url = `http://127.0.0.1:8000/entry/${editEntryId}`;

            method = "PUT";

        }

        const response = await fetch(url,{

            method,

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(entry)

        });

        const data = await response.json();

        alert(data.message);

        if(response.ok){

            localStorage.removeItem("editEntryId");

            window.location.href = "dashboard.html";

        }

    }

    catch(error){

        console.log(error);

        alert("Unable to connect to server.");

    }

});