import { useContext } from "react";
import {
  CustomSettings,
  CustomSettingsContext,
  CustomTextTypes,
} from "../../../../types/customSettings";
import { SettingsContext } from "../../../../views/MainPage/MainPage";
import { StyledCustomInput } from "./styledLinkInput";
interface IProps {
  type: CustomTextTypes;
  placeholder: string;
}

export const LinkInput = ({ placeholder, type }: IProps) => {
  const settingsContext: CustomSettingsContext | null =
    useContext(SettingsContext);
  if (!settingsContext) return null;
  const { customSettings, setCustomSettings } = settingsContext;
  return (
    <StyledCustomInput
      spellCheck={false}
      value={customSettings[type]}
      placeholder={placeholder}
      type="text"
      onChange={(e) => {
        setCustomSettings((prevState: CustomSettings) => {
          const newSettings = { ...prevState };
          newSettings[type] = e.target.value;
          return newSettings;
        });
      }}
    />
  );
};
