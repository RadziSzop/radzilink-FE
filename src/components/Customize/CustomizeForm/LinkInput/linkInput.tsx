import { Dispatch, SetStateAction } from "react";
import { ICustomSettings } from "../customizeForm";
import { StyledCustomInput } from "./styledLinkInput";
interface IProps {
  type: "customUrl" | "password";
  customSettings: ICustomSettings;
  placeholder: string;
  setCustomSettings: Dispatch<SetStateAction<any>>;
}

export const LinkInput = ({
  customSettings,
  setCustomSettings,
  placeholder,
  type,
}: IProps) => {
  return (
    <StyledCustomInput
      spellCheck={false}
      value={customSettings[type]}
      placeholder={placeholder}
      type="text"
      onChange={(e) => {
        setCustomSettings((prevState: ICustomSettings) => {
          const newSettings = { ...prevState };
          newSettings[type] = e.target.value;
          return newSettings;
        });
      }}
    />
  );
};
