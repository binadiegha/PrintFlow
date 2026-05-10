export interface LabelData {
  MetaData: Partial<IPrintingMetaData>;
  Date: string;
  TimeIn: string;
  ContainerNo: string;
  Product: string;
  Supplier: string;
  PO: string;
  Origin: string;
  Batch: string;
  NoOfPal: string;
  TotalQty: string;
  Status: string;
  StorageLoc: string;
}

export interface IData {
  label_type?: string;
}

export interface ISettings {
  printerName: string;
  zplSavePath: string;
  pdfSavePath: string;
}

export enum ECPProcessTypes {
  Guill = "Guill",
  Rovenna = "Rovenna",
  Nichrome = "Nichrome",
}

export enum ELabelTypes {
  CleaningPlant = "cleaning_plant",
  Feed = "feed",
  FGRework = "fg_rework",
  ToteBagLabel = "tote_bag_label",
  TradedGoods = "traded_goods",
  XL20kgLabel = "xl_20kg_label",
}

export enum ELabelTypeDisplayNames {
  CleaningPlant = "Cleaning Plant",
  Feed = "Feed",
  FGRework = "FG Rework",
  ToteBagLabel = "Tote Bag Label",
  TradedGoods = "Traded Goods",
  XL20kgLabel = "XL 20kg Label",
}

export interface IPrintingMetaData {
  Type: ELabelTypes;
  PrintQuantity: number;
  Line: ECPProcessTypes | null;
  ProcessDate: string | null;
  BagNumbers: string[] | number[] | null;
  ProductionDate: string | null;
  BestBeforeDate: string | null;
  PrinterName: string | null;
  ZplSavePath: string | null;
  PdfSavePath: string | null;
}
