const form = document.querySelector("#register-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirm-password").value;

    if (!username || !email || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        const response = await fetch("http://127.0.0.1:8000/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                username: username,
                email: email,
                password: password

            })

        });

        if (response.ok) {

            alert("Registration successful!");

            window.location.href = "login.html";

        }

        else {

            const error = await response.json();

            console.log(error);

            alert("Registration failed.");

        }

    }

    catch (error) {

        console.log(error);

        alert("Cannot connect to server.");

    }

});