import handleFileChange from "./scripts/handleFileChange.js";
import handleFileCreation from "./scripts/handleFileCreation.js";
import setUpTemplate from "./scripts/setUpTemplate.js";

setUpTemplate();

const fileInput = document.querySelector("#files");
fileInput.addEventListener("change", handleFileChange);

const submitButton = document.querySelector("button[type=submit]");
submitButton.addEventListener("click", handleFileCreation);
