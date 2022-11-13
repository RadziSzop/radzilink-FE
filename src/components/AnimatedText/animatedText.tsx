import { motion } from "framer-motion";
import { StyledAnimatedText } from "./styledAnimatedText";
interface IProps {
  children: string;
  colorFrom?: string;
  colorTo?: string;
  fontSize?: string;
  textAlign?: "center" | "end" | "justify" | "left" | "right" | "start";
  type?: "h1" | "h2" | "h3" | "span" | "p";
}

export const AnimatedText = ({
  children,
  colorFrom = "#e9d8c9",
  colorTo = "#774e2f",
  fontSize = "3rem",
  textAlign = "center",
  type = "p",
}: IProps) => {
  const container = {
    visible: {
      transition: {
        staggerChildren: 0.055,
      },
    },
  };
  const item = {
    hidden: {
      y: "200%",
      color: colorFrom,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.85 },
    },
    visible: {
      y: 0,
      color: colorTo,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0.75 },
    },
  };
  const splitWords = children.split(" ");
  const words: string[][] = [];
  for (const [, item] of splitWords.entries()) {
    words.push(item.split(""));
  }
  if (words.length > 1) {
    for (const word of words) {
      word.push("\u00A0");
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={container} layout>
      <StyledAnimatedText as={type} fontSize={fontSize} textAlign={textAlign}>
        {words.map((word: string[], index: number) => {
          return (
            <span
              key={index}
              style={{ display: "inline-block", overflow: "hidden" }}
            >
              {word.map((letter: string, index: number) => {
                return (
                  <motion.span
                    key={index}
                    style={{ display: "inline-block", overflow: "hidden" }}
                    variants={item}
                  >
                    {letter}
                  </motion.span>
                );
              })}
            </span>
          );
        })}
      </StyledAnimatedText>
    </motion.div>
  );
};
