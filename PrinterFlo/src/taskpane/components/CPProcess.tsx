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
import type { JSXElement } from "@fluentui/react-components";
import { addDays } from "@fluentui/react";
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

const CPProcess = () => {
  const styles = useStyles();
  const { announce } = useAnnounce();

  const [selectedDate, setSelectedDate] = React.useState<Date | null | undefined>(undefined);

  // INFO: CP process options
  const cp_dropDownId = useId("cp-dropdown");
  const cp_process_options = [
    { key: ECPProcessTypes.Guill.toLowerCase(), text: ECPProcessTypes.Guill },
    { key: ECPProcessTypes.Rovenna.toLowerCase(), text: ECPProcessTypes.Rovenna },
    { key: ECPProcessTypes.Nichrome.toLowerCase(), text: ECPProcessTypes.Nichrome },
  ];

  return (
    <>
      <div className={styles.field}>
        <label className={styles.label}>Select Line:</label>
        <Dropdown
          id={cp_dropDownId}
          placeholder="Select Line"
          defaultValue={cp_process_options[0].text}
          className={styles.cp_for}
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

export default CPProcess;
