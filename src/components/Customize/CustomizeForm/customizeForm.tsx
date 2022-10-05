import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { CustomToggle } from "./DeleteToggle/customToggle";
import { LinkInput } from "./LinkInput/linkInput";
import {
  StyledCustomizeForm,
  StyledCustomizeLabel,
  StyledInputContainer,
} from "./styledCustomizeForm";

interface IProps {
  isCustomize: boolean;
}
export interface ICustomSettings {
  customUrl: string;
  password: string;
  deleteAfterRead: boolean;
  analitics: boolean;
}
export const CustomizeForm = ({ isCustomize }: IProps) => {
  const [customSettings, setCustomSettings] = useState<ICustomSettings>({
    customUrl: "",
    password: "",
    deleteAfterRead: false,
    analitics: false,
  });
  const variants = {
    hidden: {
      height: "0px",
      opacity: 0,
      transition: {
        delay: 0.2,
        duration: 0.4,
      },
    },
    visible: {
      height: "150px",
      opacity: 1,
      transition: {
        height: { duration: 0.5, delay: 0 },
        delay: 0.2,
        duration: 0.3,
      },
    },
  };
  return (
    <>
      {isCustomize && (
        <StyledCustomizeForm
          as={motion.div}
          variants={variants}
          initial="hidden"
          animate="visible"
        >
          <StyledInputContainer>
            <StyledCustomizeLabel>
              Delete link after first use
            </StyledCustomizeLabel>
            <CustomToggle
              type="deleteAfterRead"
              customSettings={customSettings}
              setCustomSettings={setCustomSettings}
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledCustomizeLabel>Custom Link</StyledCustomizeLabel>
            <LinkInput
              customSettings={customSettings}
              type="customUrl"
              placeholder="Leave for default"
              setCustomSettings={setCustomSettings}
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledCustomizeLabel>
              Create link for analitics
            </StyledCustomizeLabel>
            <CustomToggle
              type="analitics"
              customSettings={customSettings}
              setCustomSettings={setCustomSettings}
            />
          </StyledInputContainer>
          <StyledInputContainer>
            <StyledCustomizeLabel>Password</StyledCustomizeLabel>
            <LinkInput
              customSettings={customSettings}
              type="password"
              placeholder="Leave for no password"
              setCustomSettings={setCustomSettings}
            />
          </StyledInputContainer>
        </StyledCustomizeForm>
      )}
    </>
  );
};
