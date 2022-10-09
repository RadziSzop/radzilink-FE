import { motion } from "framer-motion";
import { useContext } from "react";
import { StyledHandle, StyledSwitch } from "./styledCustomToggle";
import { IContext, ICustomSettings, SettingsContext } from "../customizeForm";
interface IProps {
  type: "deleteAfterRead" | "analitics";
}
export const CustomToggle = ({ type }: IProps) => {
  const settingsContext: IContext | null = useContext(SettingsContext);
  if (!settingsContext) return null;
  const { customSettings, setCustomSettings } = settingsContext;

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
        as={motion.div}
        layout
        transition={{
          type: "spring",
          stiffness: 650,
          damping: 25,
        }}
      />
    </StyledSwitch>
  );
};
