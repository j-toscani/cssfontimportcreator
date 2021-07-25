export default function handleFileChange(e: InputEvent) {
  const files = (e.target as HTMLInputElement).files;
  const inputContainer = document.querySelector(".filesinput__container");

  if (!files) {
    inputContainer?.classList.remove("hide");
    console.warn("No files uploaded");
    return;
  } else {
    inputContainer?.classList.add("hide");
  }

  clearFileInputs();
  const fileNames = getFileNames(files);
  const template = getTemplate();

  if (!template) {
    console.warn("Template is missing.");
    return;
  }

  const configFormNodes = createFileConfigFormNodes(fileNames, template);
  appendConfigFormNodes(configFormNodes);
}

function getFileNames(files: FileList): string[] {
  const fileArray = Array.from(files);
  return fileArray.map((file) => file.name);
}

function getTemplate() {
  return document.querySelector("#configinput") as HTMLTemplateElement;
}

function clearFileInputs(): void {
  const fontInputContainer = document.querySelector("#fontinputs");
  if (fontInputContainer) {
    fontInputContainer.innerHTML = "";
  }
}

function createFileConfigFormNodes(
  fileNames: string[],
  template: HTMLTemplateElement
): Node[] {
  return fileNames.map((fileName) => {
    const element = template.content.firstElementChild!.cloneNode(true);
    const label = (element as HTMLElement).querySelector(".configinput__label");
    if (label) {
      label.textContent = fileName;
    }
    return element;
  });
}

function appendConfigFormNodes(nodes: Node[]) {
  nodes.forEach((node) => {
    document.querySelector("#fontinputs")?.appendChild(node);
  });
}
