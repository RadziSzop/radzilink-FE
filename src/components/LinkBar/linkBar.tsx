import { motion } from "framer-motion";
import { StyledLinkBar } from "./styledLinkBar";
export const LinkBar = () => {
  return (
    <StyledLinkBar
      spellCheck={"false"}
      as={motion.input}
      type="text"
      initial={{ width: 0, opacity: 0 }}
      animate={{
        width: [70, 700],
        opacity: 1,
      }}
      transition={{
        type: "spring",
        delay: 0.5,
        stiffness: 50,
      }}
    />
  );
};
