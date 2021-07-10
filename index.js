const fileInput = document.querySelector("#files");

fileInput.addEventListener("change", (e) => {
  console.log(e.files);
});
