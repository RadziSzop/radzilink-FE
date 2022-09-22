import { LinkBar } from "../../components/LinkBar/linkBar";
import { StyledLinkBarContainer, StyledContainer } from "./styledMainPage";
import { motion } from "framer-motion";
import { AnimatedH1 } from "../../components/AnimatedText/animatedText";

export const MainPage = () => {
  return (
    <StyledContainer>
      <AnimatedH1 fontSize="3.5rem">Link Shortener</AnimatedH1>
      <StyledLinkBarContainer as={motion.div}>
        <LinkBar />
      </StyledLinkBarContainer>
    </StyledContainer>
  );
};
