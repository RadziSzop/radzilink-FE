import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";
import { StyledHandle, StyledSwitch } from "./styledCustomToggle";

interface IProps {
  type: string;
  customSettings: any;
  setCustomSettings: Dispatch<SetStateAction<any>>;
}
export const CustomToggle = ({
  customSettings,
  setCustomSettings,
  type,
}: IProps) => {
  useEffect(() => {
    console.log(customSettings);
  }, [customSettings]);
  return (
    <StyledSwitch
      as={motion.div}
      customSettings={customSettings[type]}
      onClick={() => {
        setCustomSettings((prevState: any) => {
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
          stiffness: 700,
          damping: 30,
        }}
      />
    </StyledSwitch>
  );
};
