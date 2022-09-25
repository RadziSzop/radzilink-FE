import { motion } from "framer-motion";
import { StyledLinkBar } from "./styledLinkBar";
import { useEffect, useState } from "react";
import { ShortButton } from "../ShortButton/shortButton";
export const LinkBar = () => {
  const [linkBarValue, setLinkBarValue] = useState("");

  return (
    <>
      <StyledLinkBar
        spellCheck={"false"}
        as={motion.input}
        value={linkBarValue}
        onChange={(e) => setLinkBarValue(e.target.value)}
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
      <ShortButton
        linkBarValue={linkBarValue}
        setLinkBarValue={setLinkBarValue}
      />
    </>
  );
};
