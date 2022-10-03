import { motion } from "framer-motion";
import { StyledLinkBar } from "./styledLinkBar";
import { Dispatch, SetStateAction, useState } from "react";
import { ShortButton } from "../ShortButton/shortButton";
interface IProps {
  setValidationError: Dispatch<SetStateAction<string>>;
}
export const LinkBar = ({ setValidationError }: IProps) => {
  const [linkBarValue, setLinkBarValue] = useState("");
  const [copyUrl, setCopyUrl] = useState<boolean>(false);

  return (
    <>
      <StyledLinkBar
        spellCheck={"false"}
        as={motion.input}
        value={linkBarValue}
        onChange={(e) => {
          setLinkBarValue(e.target.value);
          if (copyUrl) {
            setCopyUrl(false);
          }
        }}
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
        copyUrl={copyUrl}
        setCopyUrl={setCopyUrl}
        linkBarValue={linkBarValue}
        setLinkBarValue={setLinkBarValue}
        setValidationError={setValidationError}
      />
    </>
  );
};
