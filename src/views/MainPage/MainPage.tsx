import { LinkBar } from "../../components/LinkBar/linkBar";
import { StyledContainer } from "./styledMainPage";
import { motion } from "framer-motion";
import { AnimatedText } from "../../components/AnimatedText/animatedText";

export const MainPage = () => {
  return (
    <>
      <AnimatedText type="h1">Link Shortener</AnimatedText>
      <StyledContainer as={motion.div}>
        <LinkBar />
      </StyledContainer>
    </>
  );
};
