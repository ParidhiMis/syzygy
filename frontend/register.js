const form = document.querySelector("#login-form");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const username =
        document.querySelector("#username").value;

    const password =
        document.querySelector("#password").value;

    if (username === "" || password === "") {
        alert("Please fill all fields");
        return;
    }

    alert("Login successful!");

    // Later we'll connect this to backend
    window.location.href = "dashboard.html";

});