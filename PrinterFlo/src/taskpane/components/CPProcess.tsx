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

interface ICPProcess {
  handleCPProcess: (params: { date?: string; process?: ECPProcessTypes }) => void;
}

const CPProcess = (props: ICPProcess) => {
  const styles = useStyles();

  const cp_dropDownId = useId("cp-dropdown");
  const cp_process_options = [
    { key: ECPProcessTypes.Guill.toLowerCase(), text: ECPProcessTypes.Guill },
    { key: ECPProcessTypes.Rovenna.toLowerCase(), text: ECPProcessTypes.Rovenna },
    { key: ECPProcessTypes.Nichrome.toLowerCase(), text: ECPProcessTypes.Nichrome },
  ];

  const handleProcessType = (_e: SelectionEvents, val: OptionOnSelectData) => {
    props.handleCPProcess({ process: val.optionText as ECPProcessTypes });
  };

  const handleSelectDate = (value: Date | null | undefined) => {
    props.handleCPProcess({ date: onFormatDate(value!) });
  };

  return (
    <>
      <div className={styles.field}>
        <label className={styles.label}>Select Line:</label>
        <Dropdown
          id={cp_dropDownId}
          placeholder="Select Line"
          defaultValue={cp_process_options[0].text}
          className={styles.cp_for}
          onOptionSelect={(e, val) => handleProcessType(e, val)}
        >
          {cp_process_options.map((option) => (
            <Option key={option.key} value={option.text.toLowerCase()}>
              {option.text}
            </Option>
          ))}
        </Dropdown>
      </div>

      <AriaLiveAnnouncer>
        <Field label="Select CP Process date" className={styles.field}>
          <DatePicker
            placeholder="Select a date"
            onSelectDate={handleSelectDate}
            aria-placeholder="CP process Date"
            formatDate={onFormatDate}
            className={styles.dp}
            styles={{ root: { width: "100%" } }}
          />
        </Field>
      </AriaLiveAnnouncer>
    </>
  );
};

export default CPProcess;
