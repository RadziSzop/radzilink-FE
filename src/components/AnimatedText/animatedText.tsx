import { motion } from "framer-motion";
import { StyledAnimatedH1 } from "./styledAnimatedText";
interface IProps {
  children: string;
  colorFrom?: string;
  colorTo?: string;
  fontSize?: string;
  textAlign?: "center" | "end" | "justify" | "left" | "right" | "start";
}

export const AnimatedH1 = ({
  children,
  colorFrom = "#e9d8c9",
  colorTo = "#774e2f",
  fontSize = "3rem",
  textAlign = "center",
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
      <StyledAnimatedH1 fontSize={fontSize} textAlign={textAlign}>
        {words.map((word: string[], index: number) => {
          return (
            <div key={index} style={{ display: "inline-block" }}>
              {word.map((letter: string, index: number) => {
                return (
                  <span
                    style={{
                      overflow: "hidden",
                      display: "inline-block",
                    }}
                    key={index}
                  >
                    <motion.span
                      style={{ display: "inline-block" }}
                      variants={item}
                    >
                      {letter}
                    </motion.span>
                  </span>
                );
              })}
            </div>
          );
        })}
      </StyledAnimatedH1>
    </motion.div>
  );
};
