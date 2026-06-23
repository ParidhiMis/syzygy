const form = document.querySelector("#login-form");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const username =
        document.querySelector("#username").value;

    const password =
        document.querySelector("#password").value;

    console.log(username);
    console.log(password);

    // later this will talk to backend

    window.location.href = "dashboard.html";

});