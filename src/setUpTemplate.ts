import { StyleConfig } from "../types";

const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
const fontStyles = ["normal", "italic", "oblique"] as const;

const fontWeightConfigs = fontWeights.map((fontWeight) => ({
  label: getFontWeightLabel(fontWeight),
  value: fontWeight.toString(),
  isSelected: fontWeight === 400,
}));

const fontStyleConfigs = fontStyles.map((fontStyle) => ({
  label: getFontStylelabel(fontStyle),
  value: fontStyle.toString(),
  isSelected: fontStyle === "normal",
}));

export default function setUpTemplate() {
  const templateContent = getTemplateContent();
  if (!templateContent) {
    console.warn("No Template Content.");
    return;
  }

  const fontStyleSelect = templateContent.querySelector('[name="fontstyle"]');
  const fontWeightSelect = templateContent.querySelector('[name="fontweight"]');

  if (!fontStyleSelect || !fontWeightSelect) {
    console.warn("No Selects found.");
    return;
  }

  fillSelectWithOptions(fontStyleSelect as HTMLSelectElement, fontStyleConfigs);
  fillSelectWithOptions(
    fontWeightSelect as HTMLSelectElement,
    fontWeightConfigs
  );
}

function fillSelectWithOptions(
  element: HTMLSelectElement,
  configs: StyleConfig[]
) {
  const options = configs.map(createOption);
  options.forEach((option) => {
    element.appendChild(option);
  });
  return element;
}

function createOption(config: StyleConfig): HTMLOptionElement {
  const { value, label, isSelected } = config;
  const option = document.createElement("option");
  option.setAttribute("value", value);
  if (isSelected) {
    option.setAttribute("selected", "true");
  }
  option.textContent = label;
  return option;
}

export function getTemplateContent() {
  const template = document.querySelector("#configinput");

  if (!template) {
    console.warn("No Template found.");
    return;
  }
  return (template as HTMLTemplateElement).content.firstElementChild;
}

function getFontWeightLabel(fontWeight: number): string {
  switch (fontWeight) {
    case 400:
      return `${fontWeight} (normal)`;
    case 700:
      return `${fontWeight} (bold)`;

    default:
      return `${fontWeight}`;
  }
}

function getFontStylelabel(fontStyle: string): string {
  return fontStyle;
}
