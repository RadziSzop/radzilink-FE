import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import {
  IContext,
  ICustomSettings,
  SettingsContext,
} from "../../../../views/MainPage/MainPage";
import { StyledHandle, StyledSwitch } from "./styledCustomToggle";
interface IProps {
  type: "deleteAfterRead" | "analitics";
}
export const CustomToggle = ({ type }: IProps) => {
  const settingsContext: IContext | null = useContext(SettingsContext);
  if (!settingsContext) return null;
  const { customSettings, setCustomSettings } = settingsContext;
  useEffect(() => {
    console.log(customSettings);
  }, [customSettings]);
  return (
    <StyledSwitch
      as={motion.div}
      customSettings={customSettings[type]}
      onClick={() => {
        setCustomSettings((prevState: ICustomSettings) => {
          const newSettings = { ...prevState };
          newSettings[type] = !newSettings[type];
          return newSettings;
        });
      }}
    >
      <StyledHandle
        layout
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
