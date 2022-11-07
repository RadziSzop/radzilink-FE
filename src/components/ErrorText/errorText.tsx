import { motion } from "framer-motion";
import { StyledErrorTextContainer } from "./styledErrorText";
interface IProps {
  errorText: string;
}
function ErrorText({ errorText }: IProps) {
  return (
    <StyledErrorTextContainer>
      {errorText !== "" && (
        <motion.p
          layout
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {errorText}
        </motion.p>
      )}
    </StyledErrorTextContainer>
  );
}

export { ErrorText };
