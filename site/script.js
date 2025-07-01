const $ = (e) => document.querySelector(e);

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

window.onload = () => {
  if (
    storageAvailable("localStorage") &&
    (localStorage.getItem("theme") || "light") === "dark"
  ) {
    document.body.classList.add("dark-mode");
    $("#theme-icon").classList.toggle("bi-moon-stars-fill");
    $("#theme-icon").classList.toggle("bi-sun-fill");
  }

  $("#theme-switch").addEventListener("click", (e) => {
    document.body.classList.toggle("dark-mode");
    if (storageAvailable("localStorage")) {
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
      );
    }
    $("#theme-icon").classList.toggle("bi-moon-stars-fill");
    $("#theme-icon").classList.toggle("bi-sun-fill");
    e.target.blur(); // prevent "sticky" focus on mobile
  });
};
