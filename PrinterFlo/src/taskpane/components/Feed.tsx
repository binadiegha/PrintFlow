import React from "react";
import {
  AriaLiveAnnouncer,
  Dropdown,
  Option,
  useId,
  makeStyles,
  tokens,
  useAnnounce,
  Field,
} from "@fluentui/react-components";
import type { InputOnChangeData, JSXElement } from "@fluentui/react-components";
import { addDays } from "@fluentui/react";
import { DatePicker } from "@fluentui/react";
import { ECPProcessTypes, LabelData } from "../interfaces";
import TextInput from "./TextInput";
import { HandleBagNumber } from "../../utils/helpers";

const useStyles = makeStyles({
  cp_for: {
    width: "100%",
    marginBottom: "10px",
    marginTop: "10px",
  },

  label: {
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "10px",
  },

  field: {
    width: "100%",
    marginTop: "10px",
  },

  dp: {
    maxWidth: "100%",
  },
});

const onFormatDate = (date?: Date): string => {
  return !date ? "" : date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
};

const Feed = () => {
  const styles = useStyles();
  const { announce } = useAnnounce();

  const [selectedDate, setSelectedDate] = React.useState<Date | null | undefined>(undefined);
  const [bagNumber, setBagNumber] = React.useState<number[]>([]);
  const [bagNumberValue, setBagNumberValue] = React.useState<string>("");

  const handleBagNumberChange = (
    _ev: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    // TODO: validate bag number input if necessary
    const value = data?.value ?? "";
    let bagNumbers: string[] = [];

    setBagNumberValue(data?.value);
  };

  //   handle blur action
  const handleBagNumberBlur = () => {
    try {
      const bagNumbers = HandleBagNumber(bagNumberValue);
      setBagNumber(bagNumbers as number[]);
    } catch (error) {}
  };

  console.log({ bagNumber });
  return (
    <>
      <TextInput
        inputId="bag-number"
        label="Bag number(s)"
        placeHolder="Enter bag number(s)"
        value={bagNumberValue}
        handleChange={handleBagNumberChange}
        handleBlur={handleBagNumberBlur}
      />
      <AriaLiveAnnouncer>
        <Field label="Production date" className={styles.field}>
          <DatePicker
            aria-value={selectedDate}
            placeholder="Select a date"
            onSelectDate={setSelectedDate}
            aria-placeholder="CP process Date"
            formatDate={onFormatDate}
            className={styles.dp}
            styles={{ root: { Width: "100%" } }}
          />
        </Field>
      </AriaLiveAnnouncer>
    </>
  );
};

export default Feed;
