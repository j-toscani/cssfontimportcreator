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

  console.log(templateContent);

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
  configs: { value: string; label: string; isSelected?: boolean }[]
) {
  const options = configs.map(createOption);
  options.forEach((option, index) => {
    if (index === 0) {
      option.selected = true;
    }
    element.appendChild(option);
  });
  return element;
}

function createOption(config: {
  value: string;
  label: string;
}): HTMLOptionElement {
  const { value, label } = config;
  const option = document.createElement("option");
  option.setAttribute("value", value);
  option.textContent = label;
  return option;
}

function getTemplateContent() {
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
