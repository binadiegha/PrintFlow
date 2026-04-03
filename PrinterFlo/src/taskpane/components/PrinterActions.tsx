import * as React from "react";
import { tokens, makeStyles, Checkbox } from "@fluentui/react-components";
import { ChoiceGroup, IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import TextInsertion from "./TextInsertion";
import { getRowWithHeaders, saveData } from "../taskpane";



const options: IChoiceGroupOption[] = [
  { key: 'cleaning_plant', text: 'Cleaning plant' },
  { key: 'feed', text: 'Feed' },
  { key: 'fg_rework', text: 'FG Rework' },
  { key: 'tote_bag_label', text: 'Tote Bag Label' },
  { key: 'traded_goods', text: 'Traded Goods' },
  { key: 'xl_20kg_label', text: 'XL 20kg Label' },
];

export interface HeroListItem {
  icon: React.JSX.Element;
  primaryText: string;
}

const useStyles = makeStyles({
 details__main: {
  padding: "0px 20px",
 }
});

const PrinterActions: React.FC = () => {
  const [selectedKey, setSelectedKey] = React.useState<string | undefined>('B');
  const styles = useStyles();

   const onChange = React.useCallback((ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
    if (option) {
      setSelectedKey(option.key);
    }

    console.log(ev);
  }, []);


  return (
    <div className={styles.details__main}>
      <h2>Select The Label print type</h2>
      <ChoiceGroup selectedKey={selectedKey} options={options} onChange={onChange}  />


      {/* print action */}
    <TextInsertion printAction={getRowWithHeaders} saveAction={saveData}  />
    </div>
  );
};

export default PrinterActions;
