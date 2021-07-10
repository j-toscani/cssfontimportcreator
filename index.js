import handleFileChange from "./scripts/handleFileChange.js";
import setUpTemplate from "./scripts/setUpTemplate.js";

setUpTemplate();

const fileInput = document.querySelector("#files");
fileInput.addEventListener("change", handleFileChange);
