const fileInput = document.querySelector("#files");

fileInput.addEventListener("change", (e) => {
  const files = Array.from(e.target.files);
  const filesNames = files.map((file) => file.name);
  console.log(filesNames);
});
