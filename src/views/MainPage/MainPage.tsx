import { LinkBar } from "../../components/LinkBar/linkBar";
import { StyledLinkBarContainer, StyledContainer } from "./styledMainPage";
import { motion } from "framer-motion";
import { AnimatedH1 } from "../../components/AnimatedText/animatedText";
import { ErrorText } from "../../components/ErrorText/errorText";
import { useState } from "react";

export const MainPage = () => {
  const [validationError, setValidationError] = useState<string>("");
  return (
    <StyledContainer>
      <AnimatedH1 fontSize="3.5rem" colorTo="rgb(221, 109, 86)">
        Link Shortener
      </AnimatedH1>
      <StyledLinkBarContainer as={motion.div}>
        <LinkBar
          validationError={validationError}
          SetValidationError={setValidationError}
        />
      </StyledLinkBarContainer>
      <ErrorText errorText={validationError} />
    </StyledContainer>
  );
};
