import { motion } from "framer-motion";
import { StyledLinkBar } from "./styledLinkBar";
import { Dispatch, SetStateAction, useState } from "react";
import { ShortButton } from "../ShortButton/shortButton";
interface IProps {
  setLinkBarError: Dispatch<SetStateAction<string>>;
  setCustomSettingsError: Dispatch<SetStateAction<string>>;
}
export const LinkBar = ({
  setLinkBarError,
  setCustomSettingsError,
}: IProps) => {
  const [linkBarValue, setLinkBarValue] = useState<string>("");
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <StyledLinkBar
        spellCheck={"false"}
        as={motion.input}
        layout
        aria-label="Link Input Field"
        value={linkBarValue}
        onChange={(e) => {
          if (!isLoading) {
            setLinkBarValue(e.target.value);
            if (copyUrl) {
              setCopyUrl(false);
            }
          }
        }}
        type="text"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: ["10%", "100%"],
          opacity: 1,
          transition: {
            width: {
              type: "spring",
              delay: 0.3,
              stiffness: 50,
            },
            opacity: {
              type: "spring",
              delay: 0.5,
              stiffness: 50,
            },
          },
        }}
      />
      <ShortButton
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        copyUrl={copyUrl}
        setCopyUrl={setCopyUrl}
        linkBarValue={linkBarValue}
        setLinkBarValue={setLinkBarValue}
        setLinkBarError={setLinkBarError}
        setCustomSettingsError={setCustomSettingsError}
      />
    </>
  );
};
