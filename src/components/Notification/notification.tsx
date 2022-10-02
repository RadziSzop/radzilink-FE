import { motion, useAnimationControls } from "framer-motion";
import { Dispatch, SetStateAction, useEffect } from "react";
import { NotificationContainer } from "./styledNotification";
interface IProps {
  time: number;
  message: string;
  disabler: Dispatch<SetStateAction<boolean>>;
}
export const Notification = ({ message, time, disabler }: IProps) => {
  const animationControler = useAnimationControls();
  const NotificationVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      transition: { type: "spring", delay: time / 1000 },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.1, type: "spring", stiffness: 200 },
    },
  };
  useEffect(() => {
    (async () => {
      await animationControler.set("hidden");
      await animationControler.start("visible");
      await animationControler.start("hidden");
      disabler(false);
    })();
  }, []);
  return (
    <NotificationContainer
      as={motion.div}
      variants={NotificationVariants}
      animate={animationControler}
    >
      {message}
    </NotificationContainer>
  );
};
