const form = document.querySelector("#login-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email =
        document.querySelector("#email").value.trim();

    const password =
        document.querySelector("#password").value;

    if (!email || !password) {

        alert("Please fill all fields.");

        return;

    }

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/login",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    email,
                    password

                })

            }
        );

        const data = await response.json();

        alert(data.message);

        if (data.message === "Login successful") {

            localStorage.setItem("currentUser", data.username);

            localStorage.setItem("userId", data.user_id);

            localStorage.setItem("email", data.email);

            window.location.href = "dashboard.html";

        }

    }

    catch (error) {

        console.error(error);

        alert("Unable to connect to the server.");

    }

});