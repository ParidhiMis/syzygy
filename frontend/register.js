const form = document.querySelector("#register-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;

    if(password !== confirmPassword){

        alert("Passwords do not match");
        return;

    }

    const response = await fetch("http://127.0.0.1:8000/register",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username,
            email,
            password

        })

    });

    const data = await response.json();

    alert(data.message);

    if(data.message==="Registration successful"){

        window.location.href="login.html";

    }

});