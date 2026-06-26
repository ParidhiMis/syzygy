const stars = document.querySelectorAll(".star");
const form = document.getElementById("entry-form");

const status = document.getElementById("status");

const startGroup = document.getElementById("start-group");
const finishGroup = document.getElementById("finish-group");

let rating = 0;

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

        const response=await fetch(
            "http://127.0.0.1:8000/entry",
            {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(entry)

            }
        );

        const data=await response.json();

        alert(data.message);

        if(response.ok){

            window.location.href="dashboard.html";

        }

    }

    catch(error){

        console.log(error);

        alert("Unable to connect to server.");

    }

});