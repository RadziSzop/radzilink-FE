import { LinkBar } from "../../components/LinkBar/linkBar";
import {
  StyledLinkBarContainer,
  StyledContainer,
  StyledCustomizeContainer,
} from "./styledMainPage";
import { motion } from "framer-motion";
import { AnimatedH1 } from "../../components/AnimatedText/animatedText";
import { ErrorText } from "../../components/ErrorText/errorText";
import { useState } from "react";
import { CustomizeButton } from "../../components/Customize/CustomizeButton/customizeButton";
import { CustomizeForm } from "../../components/Customize/CustomizeForm/customizeForm";

export const MainPage = () => {
  const [validationError, setValidationError] = useState<string>("");
  const [isCustomize, setIsCustomize] = useState<boolean>(false);

  return (
    <StyledContainer>
      <AnimatedH1 fontSize="3.5rem" colorTo="rgb(221, 109, 86)">
        Link Shortener
      </AnimatedH1>
      <StyledLinkBarContainer as={motion.div}>
        <LinkBar
          // validationError={validationError}
          setValidationError={setValidationError}
        />
      </StyledLinkBarContainer>
      <ErrorText errorText={validationError} />
      <StyledCustomizeContainer>
        <CustomizeButton
          isCustomize={isCustomize}
          setIsCustomize={setIsCustomize}
        />
        <CustomizeForm isCustomize={isCustomize} />
      </StyledCustomizeContainer>
    </StyledContainer>
  );
};
