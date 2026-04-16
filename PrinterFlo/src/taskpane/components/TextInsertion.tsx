import * as React from "react";
import { useState } from "react";
import {
  Button,
  Field,
  tokens,
  makeStyles,
  Dropdown,
  Option,
  useId,
} from "@fluentui/react-components";
import { TextField } from "@fluentui/react";
import { ELabelTypes, IData, LabelData } from "../interfaces";
import { sendForPrint, testApi } from "../../utils/helpers";
import CPProcess from "./CPProcess";
import Feed from "./Feed";
import Rework from "./Rework";
import TradedGoods from "./TradedGoods";

/* global HTMLTextAreaElement */

interface IPrintingProps {
  insertText?: (text: string) => void;
  printAction?: () => Promise<Partial<LabelData>>;
  saveAction?: () => void;
  data?: Partial<IData>;
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

const TextInsertion: React.FC<IPrintingProps> = (props: IPrintingProps) => {
  const { data } = props;
  const [printQty, setPrintQty] = useState<number>(1);

  const handlePrintAction = async () => {
    const labelData: Partial<LabelData> | undefined = await props.printAction?.();

    if (!labelData) {
      console.log("No label data to print");
      return;
    }

    // await testApi();
    await sendForPrint(labelData);
  };

  const handlePrintAndSaveAction = async () => {
    await props.printAction?.();
  };
  const handleTextChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>,
    newValue?: string
  ) => {
    const value = newValue ?? (event.currentTarget as HTMLInputElement).value;
    setPrintQty(parseInt(value, 10) || 1);
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      {data?.label_type === ELabelTypes.CleaningPlant && <CPProcess />}
      {data?.label_type === ELabelTypes.Feed && <Feed />}
      {data?.label_type === ELabelTypes.FGRework && <Rework />}
      {data?.label_type === ELabelTypes.TradedGoods && <TradedGoods />}

      {/* Actions go under here  */}
      <Field className={styles.textAreaField} size="large" label="Print Qty">
        <TextField type="number" onChange={handleTextChange} defaultValue={`${printQty}`} min={1} />
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

export default TextInsertion;
