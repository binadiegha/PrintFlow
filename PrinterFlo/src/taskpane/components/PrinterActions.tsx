import * as React from "react";
import { tokens, makeStyles, Dropdown, Option, useId } from "@fluentui/react-components";
import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react/lib/ChoiceGroup";
import TextInsertion from "./TextInsertion";
import { getRowWithHeaders, saveData } from "../taskpane";
import { ELabelTypeDisplayNames, ELabelTypes, IData } from "../interfaces";
import type { DropdownProps } from "@fluentui/react-components";

const options: IChoiceGroupOption[] = [
  { key: ELabelTypes.CleaningPlant, text: ELabelTypeDisplayNames.CleaningPlant },
  { key: ELabelTypes.Feed, text: ELabelTypeDisplayNames.Feed },
  { key: ELabelTypes.FGRework, text: ELabelTypeDisplayNames.FGRework },
  { key: ELabelTypes.ToteBagLabel, text: ELabelTypeDisplayNames.ToteBagLabel },
  { key: ELabelTypes.TradedGoods, text: ELabelTypeDisplayNames.TradedGoods },
  { key: ELabelTypes.XL20kgLabel, text: ELabelTypeDisplayNames.XL20kgLabel },
];

export interface HeroListItem {
  icon: React.JSX.Element;
  primaryText: string;
}

const useStyles = makeStyles({
  details__main: {
    padding: "0px 20px",
  },

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
});

const PrinterActions: React.FC = (props: Partial<DropdownProps>) => {
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>("B");
  const [data, setData] = React.useState<Partial<IData>>({});
  const styles = useStyles();

  const label_type_dropDownId = useId("label-type-dropdown");

  const handleChange: (typeof props)["onOptionSelect"] = React.useCallback(
    (_ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: any) => {
      if (option) {
        setSelectedKey(option.key);
        setData((prevData) => ({
          ...prevData,
          label_type: option.optionValue,
        }));
      }
    },
    []
  );

  return (
    <form>
      <div className={styles.details__main}>
        <h2>Label Printing Service</h2>

        <div className={styles.field}>
          <label htmlFor={label_type_dropDownId} className={styles.label}>
            Select Label Type
          </label>
          <Dropdown
            id={label_type_dropDownId}
            placeholder={"select_label_type"}
            defaultValue={"Select Label Type"}
            className={styles.cp_for}
            onOptionSelect={handleChange}
          >
            {options.map((option) => (
              <Option key={option.key} value={option.key}>
                {option.text}
              </Option>
            ))}
          </Dropdown>
        </div>
        {/* <ChoiceGroup selectedKey={selectedKey} options={options} onChange={onChange} /> */}

        {/* print action */}
        <TextInsertion printAction={getRowWithHeaders} saveAction={saveData} data={data} />
      </div>
    </form>
  );
};

export default PrinterActions;
