import { motion, useSpring, useTime, useTransform } from "framer-motion";
import {
  Styled404Header,
  Styled404Span,
  StyledIndicator,
} from "./styled404Page";
import { useNavigate } from "react-router-dom";
export const Page404 = () => {
  const navigate = useNavigate();
  const time = useTime();
  const time2 = useSpring(time);
  const width = useTransform(time2, [0, 1750], ["0%", "100%"]);
  setTimeout(() => {
    navigate(`/`);
  }, 4000);
  return (
    <>
      <StyledIndicator as={motion.div} style={{ width }} />
      <Styled404Span>404</Styled404Span>
      <br />
      <Styled404Header> Page not found!</Styled404Header>
    </>
  );
};
