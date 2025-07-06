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
  $("#theme-switch").addEventListener("change", (e) => {
    if (storageAvailable("localStorage")) {
      localStorage.setItem("theme", e.target.checked ? "dark" : "light");
    }
    e.target.blur(); // prevent "sticky" focus on mobile
  });

  // check if user prefers dark mode
  $("#theme-switch").checked = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  // restore theme from local storage
  if (
    storageAvailable("localStorage") &&
    localStorage.getItem("theme") !== null
  ) {
    $("#theme-switch").checked = localStorage.getItem("theme") === "dark";
  }
};
