import React from "react";
import {
  AriaLiveAnnouncer,
  Dropdown,
  Option,
  useId,
  makeStyles,
  tokens,
  Field,
} from "@fluentui/react-components";
import type { OptionOnSelectData, SelectionEvents } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react";
import { ECPProcessTypes } from "../interfaces";

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

interface IReworkProps {
  handleReworkData: (data: { line?: ECPProcessTypes; reworkDate?: string }) => void;
}

const Rework = (props: IReworkProps) => {
  const styles = useStyles();

  const rework_dropDownId = useId("rework-dropdown");
  const rework_options = [
    { key: ECPProcessTypes.Guill.toLowerCase(), text: ECPProcessTypes.Guill },
    { key: ECPProcessTypes.Rovenna.toLowerCase(), text: ECPProcessTypes.Rovenna },
    { key: ECPProcessTypes.Nichrome.toLowerCase(), text: ECPProcessTypes.Nichrome },
  ];

  const handleProcessType = (_e: SelectionEvents, val: OptionOnSelectData) => {
    props.handleReworkData({ line: val.optionText as ECPProcessTypes });
  };

  const handleSelectDate = (value: Date | null | undefined) => {
    props.handleReworkData({ reworkDate: onFormatDate(value!) });
  };

  return (
    <>
      <div className={styles.field}>
        <label className={styles.label}>Select Line:</label>
        <Dropdown
          id={rework_dropDownId}
          placeholder="Select Line"
          defaultValue={rework_options[0].text}
          className={styles.cp_for}
          onOptionSelect={handleProcessType}
        >
          {rework_options.map((option) => (
            <Option key={option.key} value={option.text.toLowerCase()}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </div>

      <AriaLiveAnnouncer>
        <Field label="Select Rework date" className={styles.field}>
          <DatePicker
            placeholder="Select a date"
            onSelectDate={handleSelectDate}
            aria-placeholder="Rework Date"
            formatDate={onFormatDate}
            className={styles.dp}
            styles={{ root: { width: "100%" } }}
          />
        </Field>
      </AriaLiveAnnouncer>
    </>
  );
};

export default Rework;
