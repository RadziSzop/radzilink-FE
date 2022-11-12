import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
import { StyledCustomizeButton } from "./styledCustomizeButton";

interface IProps {
  setIsCustomize: Dispatch<SetStateAction<boolean>>;
}

export const CustomizeButton = ({ setIsCustomize }: IProps) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,

      backgroundColor: "#ec6e55",
      transition: { opacity: { type: "linear", delay: 2 } },
    },

    hover: {
      backgroundColor: "#bc543e",
      scale: 1.05,
    },
    click: {
      scale: 0.95,
    },
  };

  return (
    <StyledCustomizeButton
      as={motion.div}
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="click"
      layout
      onClick={() => {
        setIsCustomize((prevState: boolean) => {
          return !prevState;
        });
      }}
    >
      Customize
    </StyledCustomizeButton>
  );
};
