import * as React from "react";
import { tokens, makeStyles, Dropdown, Option, useId } from "@fluentui/react-components";
import type { OptionOnSelectData, SelectionEvents } from "@fluentui/react-components";
import MainPage from "./MainPage";
import SettingsDialog from "./SettingsDialog";
import { getRowWithHeaders, saveData } from "../taskpane";
import { ELabelTypeDisplayNames, ELabelTypes, IData, ISettings } from "../interfaces";

const options = [
  { key: ELabelTypes.CleaningPlant, text: ELabelTypeDisplayNames.CleaningPlant },
  { key: ELabelTypes.Feed, text: ELabelTypeDisplayNames.Feed },
  { key: ELabelTypes.FGRework, text: ELabelTypeDisplayNames.FGRework },
  { key: ELabelTypes.ToteBagLabel, text: ELabelTypeDisplayNames.ToteBagLabel },
  { key: ELabelTypes.TradedGoods, text: ELabelTypeDisplayNames.TradedGoods },
  { key: ELabelTypes.XL20kgLabel, text: ELabelTypeDisplayNames.XL20kgLabel },
];

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

const PrinterActions: React.FC = () => {
  const [data, setData] = React.useState<Partial<IData>>({});
  const [settings, setSettings] = React.useState<ISettings>({
    printerName: "",
    zplSavePath: "",
    pdfSavePath: "",
  });
  const styles = useStyles();

  const label_type_dropDownId = useId("label-type-dropdown");

  const handleChange = React.useCallback((_ev: SelectionEvents, option: OptionOnSelectData) => {
    setData((prevData) => ({
      ...prevData,
      label_type: option.optionValue,
    }));
  }, []);

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
            placeholder="Select Label Type"
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

        <MainPage
          printAction={getRowWithHeaders}
          saveAction={saveData}
          data={data}
          settings={settings}
        />

        <SettingsDialog onSettingsChange={setSettings} />
      </div>
    </form>
  );
};

export default PrinterActions;
