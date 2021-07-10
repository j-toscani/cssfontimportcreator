export type FontConfigStyle = {
  weight?: string;
  style?: string;
  type?: string;
  url: string;
};

export type FontImportConfig = {
  fontName: string;
  fontFamily: string;
  styles: FontConfigStyle[];
};

export type StyleConfig = { value: string; label: string; isSelected: boolean };
