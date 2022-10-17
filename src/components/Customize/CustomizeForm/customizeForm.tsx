import { motion } from "framer-motion";

import { CustomToggle } from "./DeleteToggle/customToggle";
import { LinkInput } from "./LinkInput/linkInput";
import {
  StyledCustomizeForm,
  StyledCustomizeLabel,
  StyledInputContainer,
} from "./styledCustomizeForm";

export interface ICustomSettings {
  customUrl: string | null;
  password: string | null;
  deleteAfterRead: boolean;
  analitics: boolean;
}

interface IProps {
  isCustomize: boolean;
}
export const CustomizeForm = ({ isCustomize }: IProps) => {
  const formVariants = {
    hidden: {
      height: "0px",
      opacity: 0,
    },
    visible: {
      height: "120px",
      opacity: 1,
      transition: {
        height: { duration: 0.5, delay: 0 },
        delay: 0.2,
        duration: 0.3,
      },
    },
  };
  const containerVariatns = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
      },
    },
  };
  return (
    <>
      <StyledCustomizeForm
        as={motion.div}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <StyledInputContainer as={motion.div} variants={containerVariatns}>
          <StyledCustomizeLabel as={motion.label}>
            Delete link after first use
          </StyledCustomizeLabel>
          <CustomToggle type="deleteAfterRead" />
        </StyledInputContainer>
        <StyledInputContainer as={motion.div} variants={containerVariatns}>
          <StyledCustomizeLabel as={motion.label}>
            Custom Link
          </StyledCustomizeLabel>
          <LinkInput type="customUrl" placeholder="Leave for default" />
        </StyledInputContainer>
        <StyledInputContainer as={motion.div} variants={containerVariatns}>
          <StyledCustomizeLabel as={motion.label}>
            Create link for analitics
          </StyledCustomizeLabel>
          <CustomToggle type="analitics" />
        </StyledInputContainer>
        <StyledInputContainer as={motion.div} variants={containerVariatns}>
          <StyledCustomizeLabel as={motion.label}>
            Password
          </StyledCustomizeLabel>
          <LinkInput type="password" placeholder="Leave for no password" />
        </StyledInputContainer>
      </StyledCustomizeForm>
    </>
  );
};
