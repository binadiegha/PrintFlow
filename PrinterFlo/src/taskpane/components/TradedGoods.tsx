import React from "react";
import {
  AriaLiveAnnouncer,
  makeStyles,
  tokens,
  Field,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react";

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

interface ITradedGoodsProps {
  handleTradedGoodsData: (data: { bestBeforeDate?: string }) => void;
}

const TradedGoods = (props: ITradedGoodsProps) => {
  const styles = useStyles();

  const handleSelectDate = (value: Date | null | undefined) => {
    props.handleTradedGoodsData({ bestBeforeDate: onFormatDate(value!) });
  };

  return (
    <>
      <AriaLiveAnnouncer>
        <Field label="Select Best Before date" className={styles.field}>
          <DatePicker
            placeholder="Select a date"
            onSelectDate={handleSelectDate}
            aria-placeholder="Best Before Date"
            formatDate={onFormatDate}
            className={styles.dp}
            styles={{ root: { width: "100%" } }}
          />
        </Field>
      </AriaLiveAnnouncer>
    </>
  );
};

export default TradedGoods;
