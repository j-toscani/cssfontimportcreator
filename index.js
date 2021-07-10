import handleFileChange from "./dist/handleFileChange.js";

const fileInput = document.querySelector("#files");
fileInput.addEventListener("change", handleFileChange);
