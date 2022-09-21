import { motion } from "framer-motion";
interface IProps {
  children: string;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
  colorFrom?: string;
  colorTo?: string;
}

export const AnimatedText = ({
  children,
  type = "p",
  colorFrom = "#e9d8c9",
  colorTo = "#836245",
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
  for (const word of words) {
    word.push("\u00A0");
  }
  const Type = type;
  return (
    <motion.div initial="hidden" animate="visible" variants={container}>
      <Type>
        {words.map((word: string[]) => {
          return (
            <>
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
            </>
          );
        })}
      </Type>
    </motion.div>
  );
};
