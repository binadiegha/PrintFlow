import * as React from "react";
import Header from "./Header";
import { makeStyles } from "@fluentui/react-components";
import { Ribbon24Regular, LockOpen24Regular, DesignIdeas24Regular } from "@fluentui/react-icons";
import PrinterActions from "./PrinterActions";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App: React.FC<AppProps> = (props: AppProps) => {
  const styles = useStyles();
  // The list items are static and won't change at runtime,
  // so this should be an ordinary const, not a part of state.

  return (
    <div className={styles.root}>
      <Header logo="assets/lt-logo.svg" title={props.title} message="Welcome" />
      <PrinterActions />
    </div>
  );
};

export default App;
