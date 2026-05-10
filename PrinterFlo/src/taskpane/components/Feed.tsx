import React from "react";
import {
  AriaLiveAnnouncer,
  useId,
  makeStyles,
  tokens,
  Field,
} from "@fluentui/react-components";
import type { InputOnChangeData } from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react";
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

interface IFeedProps {
  handleFeedData: (data: { bagNumbers?: number[]; productionDate?: string }) => void;
}

const Feed = (props: IFeedProps) => {
  const styles = useStyles();
  const [bagNumberValue, setBagNumberValue] = React.useState<string>("");

  const handleBagNumberChange = (
    _ev: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    setBagNumberValue(data?.value ?? "");
  };

  const handleBagNumberBlur = () => {
    try {
      const bagNumbers = HandleBagNumber(bagNumberValue);
      props.handleFeedData({ bagNumbers: bagNumbers as number[] });
    } catch (error) {}
  };

  const handleSelectDate = (value: Date | null | undefined) => {
    props.handleFeedData({ productionDate: onFormatDate(value!) });
  };

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
            placeholder="Select a date"
            onSelectDate={handleSelectDate}
            aria-placeholder="Production Date"
            formatDate={onFormatDate}
            className={styles.dp}
            styles={{ root: { width: "100%" } }}
          />
        </Field>
      </AriaLiveAnnouncer>
    </>
  );
};

export default Feed;
