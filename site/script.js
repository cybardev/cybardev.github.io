const $ = (e) => document.querySelector(e);

window.onload = () => {
    $("#theme-switch").addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.toggle("dark-mode");
        $("#theme-icon").classList.toggle("bi-moon-stars-fill");
        $("#theme-icon").classList.toggle("bi-sun-fill");
    })
};