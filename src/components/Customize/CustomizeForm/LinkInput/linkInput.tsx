import { useContext } from "react";
import { IContext, ICustomSettings, SettingsContext } from "../customizeForm";
import { StyledCustomInput } from "./styledLinkInput";
interface IProps {
  type: "customUrl" | "password";
  placeholder: string;
}

export const LinkInput = ({ placeholder, type }: IProps) => {
  const settingsContext: IContext | null = useContext(SettingsContext);
  if (!settingsContext) return null;
  const { customSettings, setCustomSettings } = settingsContext;
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
