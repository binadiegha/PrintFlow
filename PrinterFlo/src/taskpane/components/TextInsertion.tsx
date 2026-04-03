import * as React from "react";
import { useState } from "react";
import { Button, Field, tokens, makeStyles } from "@fluentui/react-components";
import { TextField } from "@fluentui/react";

/* global HTMLTextAreaElement */

interface TextInsertionProps {
  insertText?: (text: string) => void;
  printAction?: () => void;
  saveAction?: () => void;
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
  }
});

const TextInsertion: React.FC<TextInsertionProps> = (props: TextInsertionProps) => {
  const [printQty, setPrintQty] = useState<number>(1);


  const handlePrintAction = async () => {
    await props.printAction?.();
  };

  const handlePrintAndSaveAction = async () => {
    await props.printAction?.();
  };
  const handleTextChange = (event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>, newValue?: string) => {
    const value = newValue ?? (event.currentTarget as HTMLInputElement).value;
    setPrintQty(parseInt(value, 10) || 1);
  };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      {/* <Field className={styles.textAreaField} size="large" label="Enter text to be inserted into the document.">
        <Textarea size="large" value={text} onChange={handleTextChange} />
      </Field>
      <Field className={styles.instructions}>Click the button to insert text.</Field> */}

      <Field className={styles.textAreaField} size="large" label="Print Qty">
        <TextField type="number" onChange={handleTextChange} defaultValue={`${printQty}`} min={1} />
      </Field>
      <Button className={styles.btn} appearance="primary" disabled={false} size="large" onClick={handlePrintAction}>
        Print Label
      </Button>
      <Button className={styles.btn} appearance="primary" disabled={false} size="large" onClick={handlePrintAndSaveAction}>
        Print & Save
      </Button>
    </div>
  );
};

export default TextInsertion;
