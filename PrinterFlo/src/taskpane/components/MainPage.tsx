import * as React from "react";
import { useState } from "react";
import {
  Button,
  Field,
  tokens,
  makeStyles,
} from "@fluentui/react-components";
import { TextField } from "@fluentui/react";
import { ECPProcessTypes, ELabelTypes, IData, IPrintingMetaData, ISettings, LabelData } from "../interfaces";
import { sendForPrint } from "../../utils/helpers";
import CPProcess from "./CPProcess";
import Feed from "./Feed";
import Rework from "./Rework";
import TradedGoods from "./TradedGoods";
import ToteBagLabel from "./ToteBagLabel";

/* global HTMLTextAreaElement */

interface IPrintingProps {
  insertText?: (text: string) => void;
  printAction?: () => Promise<Partial<LabelData>>;
  saveAction?: () => void;
  data?: Partial<IData>;
  settings?: ISettings;
}

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAreaField: {
    marginTop: "20px",
    marginBottom: "10px",
    width: "100%",
  },

  btn: {
    width: "100%",
    marginTop: "20px",
  },
});

const MainPage: React.FC<IPrintingProps> = (props: IPrintingProps) => {
  const { data, settings } = props;
  const [metaData, setMetaData] = useState<Partial<IPrintingMetaData>>({});
  const [prntQty, setPrntQty] = useState<number>(1);

  const handlePrintAction = async () => {
    const labelData: Partial<LabelData> | undefined = await props.printAction?.();

    if (!labelData) {
      console.log("No label data to print");
      return;
    }

    labelData.MetaData = {
      ...metaData,
      Type: data?.label_type as ELabelTypes,
      PrinterName: settings?.printerName ?? null,
      ZplSavePath: settings?.zplSavePath ?? null,
      PdfSavePath: settings?.pdfSavePath ?? null,
    };

    await sendForPrint(labelData);
  };

  const handlePrintAndSaveAction = async () => {
    await props.printAction?.();
  };

  const handlePrintQtyChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>,
    newValue?: string
  ) => {
    const value: number = parseInt(newValue ?? (event.currentTarget as HTMLInputElement).value, 10) || 1;
    setPrntQty(value)
    setMetaData(prev => ({ ...prev, PrintQuantity: value }));
  };

  const handleCPProcess = (prps: { date?: string; process?: ECPProcessTypes }) => {
    if (prps.date) setMetaData( ({  ProcessDate: prps.date }));
    if (prps.process) setMetaData(prev => ({ ...prev, Line: prps.process, PrintQuantity: prntQty }));
  };

  const handleFeedData = ({ bagNumbers, productionDate }: { bagNumbers?: number[]; productionDate?: string }) => {
    if (bagNumbers) setMetaData( ({  BagNumbers: bagNumbers }));
    if (productionDate) setMetaData(prev => ({ ...prev, ProductionDate: productionDate,  PrintQuantity: prntQty }));
  };

  const handleReworkData = ({ line, reworkDate }: { line?: ECPProcessTypes; reworkDate?: string }) => {
    if (line) setMetaData( ({ Line: line }));
    if (reworkDate) setMetaData(prev => ({ ...prev, ProcessDate: reworkDate,  PrintQuantity: prntQty }));
  };

  const handleTradedGoodsData = ({ bestBeforeDate }: { bestBeforeDate?: string }) => {
    if (bestBeforeDate) setMetaData( ({  BestBeforeDate: bestBeforeDate,  PrintQuantity: prntQty }));
  };




  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      {data?.label_type === ELabelTypes.CleaningPlant && <CPProcess handleCPProcess={handleCPProcess} />}
      {data?.label_type === ELabelTypes.Feed && <Feed handleFeedData={handleFeedData} />}
      {data?.label_type === ELabelTypes.FGRework && <Rework handleReworkData={handleReworkData} />}
      {data?.label_type === ELabelTypes.TradedGoods && <TradedGoods handleTradedGoodsData={handleTradedGoodsData} />}
      {data?.label_type === ELabelTypes.ToteBagLabel && <ToteBagLabel />}

      <Field className={styles.textAreaField} size="large" label="Print Qty">
        <TextField type="number" onChange={handlePrintQtyChange} defaultValue={`${metaData.PrintQuantity}`} min={1} />
      </Field>

      <Button
        className={styles.btn}
        appearance="primary"
        disabled={false}
        size="large"
        onClick={handlePrintAction}
      >
        Print Label
      </Button>
      <Button
        className={styles.btn}
        appearance="primary"
        disabled={false}
        size="large"
        onClick={handlePrintAndSaveAction}
      >
        Print & Save
      </Button>
    </div>
  );
};

export default MainPage;
