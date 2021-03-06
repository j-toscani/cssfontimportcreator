import { FontConfigStyle } from "../types";

export default function handleFormSubmit(e: Event) {
  e.preventDefault();
  const fieldsets = Array.from(getFieldsets());
  const configs = fieldsets.map((fieldset) => getConfigFromFieldset(fieldset));
  const metaInfos = getMetaInfos();

  const fileConfig = {
    ...metaInfos,
    configs,
  };

  const createFileString = createFileStringCreator(
    fileConfig.name,
    fileConfig.type
  );

  const fileContent = fileConfig.configs
    .map((config) => createFileString(config))
    .join("\n");

  const blob = new Blob([fileContent.replace(/\s+/g, "")], {
    type: "text/css",
  });
  const objectUrl = URL.createObjectURL(blob);
  downloadFile(objectUrl, fileConfig.name);
  displayCssString(fileContent);
}

function getFieldsets() {
  return document.querySelectorAll("#fontinputs > fieldset");
}

function displayCssString(fileContent: string) {
  document.querySelector("#cssdisplay")!.textContent = fileContent;
  document.querySelector("#cssdisplaycontainer")?.classList.add("visible");
}

function downloadFile(fileUrl: string, fileName: string) {
  const name = fileName.toLowerCase().split(" ").join("") + ".css";
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = name;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function createFileStringCreator(name: string, type: string) {
  return (config: FontConfigStyle) =>
    `
    @font-face {
      font-family: ${name}, ${type};
      ${config.weight ? "font-weight: " + config.weight + ";" : ""}
      ${config.style ? "font-style: " + config.style + ";" : ""}
      src: url("${config.src}");
    }\n`;
}

function getMetaInfos() {
  const typeSelect = document.querySelector("#fonttype");
  const fontNameInput = document.querySelector("#fontname");

  return {
    name: (fontNameInput as HTMLInputElement).value,
    type: (typeSelect as HTMLSelectElement).value,
  };
}

function getConfigFromFieldset(fieldset: Element): FontConfigStyle {
  const fileName = fieldset.querySelector("legend")!.innerText;
  const values = getSelectValues(fieldset);

  return {
    style: values[0] ?? "normal",
    weight: values[1] ?? "400",
    src: `/${fileName}`,
  };
}

function getSelectValues(container: Element) {
  return Array.from(
    container.querySelectorAll("select"),
    (e: HTMLSelectElement) => e.value
  );
}
