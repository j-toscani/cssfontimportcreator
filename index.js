import handleFileChange from "./scripts/handleFileChange.js";

const fileInput = document.querySelector("#files");
fileInput.addEventListener("change", handleFileChange);
