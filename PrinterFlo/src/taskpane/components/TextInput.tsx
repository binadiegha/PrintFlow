import React from "react";
import { useId, makeStyles, Input, Label } from "@fluentui/react-components";
import type { InputOnChangeData, InputProps } from "@fluentui/react-components";

interface IInputEventHandlers {
  handleChange?: (ev: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void;
  handleBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
}

interface IInputProps extends IInputEventHandlers {
  inputId: string;
  placeHolder?: string;
  label: string;
  value?: string;
}

const useStyles = makeStyles({
  // Define your styles here if needed
  textInputContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "5px",
    width: "100%",
  },

  label: {
    fontWeight: "600",
    marginBottom: "5px",
  },
});

const TextInput = (props: IInputProps) => {
  const inputId = useId(props.inputId);
  const styles = useStyles();

  const _onChange: InputProps["onChange"] = (ev: React.ChangeEvent<HTMLInputElement>, data) => {
    props.handleChange?.(ev, data); // Call the passed in handleChange prop if it exists
  };

  const _handleBlur: InputProps["onBlur"] = (ev: React.FocusEvent<HTMLInputElement>) => {
    props.handleBlur?.(ev); // Call the passed in handleBlur prop if it exists
  };

  return (
    <>
      <div className={styles.textInputContainer}>
        <Label className={styles.label} htmlFor={inputId ?? "input-id"}>
          {props.label ?? "Label"}
        </Label>
        <Input
          id={inputId ?? "input-id"}
          value={props.value}
          onChange={_onChange}
          placeholder={props.placeHolder}
          onBlur={_handleBlur}
        />
      </div>
    </>
  );
};

export default TextInput;
