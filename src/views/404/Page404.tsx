import { motion, useSpring, useTime, useTransform } from "framer-motion";
import {
  Styled404Header,
  Styled404Span,
  StyledIndicator,
} from "./styled404Page";

export const Page404 = () => {
  // const time = useTime();
  // const rotate = useTransform(
  //   time,
  //   [0, 4000], // For every 4 seconds...
  //   [0, 100], // ...rotate 360deg
  //   { clamp: false }
  // );

  setTimeout(() => {
    window.location.replace("http://localhost:5173");
  }, 4000);
  return (
    <>
      <Styled404Span>404</Styled404Span>
      <br />
      <Styled404Header> Page not found!</Styled404Header>
    </>
  );
};
