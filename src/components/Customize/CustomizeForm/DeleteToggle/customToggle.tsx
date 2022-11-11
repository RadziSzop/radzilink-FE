import { motion } from "framer-motion";
import { useContext } from "react";
import {
  CustomSettings,
  CustomSettingsContext,
  CustomToggleTypes,
} from "../../../../types/customSettings";
import { SettingsContext } from "../../../../views/MainPage/MainPage";
import { StyledHandle, StyledSwitch } from "./styledCustomToggle";
interface IProps {
  type: CustomToggleTypes;
  disable?: CustomToggleTypes;
  disabled?: boolean;
}
export const CustomToggle = ({ type, disable, disabled }: IProps) => {
  const settingsContext: CustomSettingsContext | null =
    useContext(SettingsContext);
  if (!settingsContext) return null;
  const { customSettings, setCustomSettings } = settingsContext;
  return (
    <StyledSwitch
      as={motion.div}
      customSettings={customSettings[type]}
      disabled={disabled ?? false}
      onClick={() => {
        if (!disabled) {
          setCustomSettings((prevState: CustomSettings) => {
            const newSettings = { ...prevState };
            newSettings[type] = !newSettings[type];
            if (disable) {
              newSettings[disable] = false;
            }
            return newSettings;
          });
        }
      }}
    >
      <StyledHandle
        customSettings={customSettings[type]}
        layout
        disabled={disabled ?? false}
        as={motion.div}
        transition={{
          type: "spring",
          stiffness: 650,
          damping: 25,
        }}
      />
    </StyledSwitch>
  );
};
