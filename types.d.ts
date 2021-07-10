type FontConfigStyle = {
  weight?: string;
  style?: string;
  url: string;
};

type FontImportConfig = {
  fontName: string;
  fontFamily: string;
  styles: FontConfigStyle[];
};
