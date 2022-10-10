import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

import { NotificationContainer } from "./styledNotification";
interface IProps {
  time: number;
}
export const notification = () => {
  const animationControler = useAnimationControls();
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    if (message) {
      setTimeout(async () => {
        await animationControler.start("visible");
        await animationControler.start("hidden");
        setMessage("");
      }, 50);
    }
  }, [message]);
  const NotificationProvider = ({ time }: IProps) => {
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
    return (
      <>
        <NotificationContainer
          as={motion.div}
          variants={NotificationVariants}
          animate={animationControler}
          initial="hidden"
        >
          {message}
        </NotificationContainer>
      </>
    );
  };
  const notify = (message: string) => {
    setMessage(message);
  };
  return { NotificationProvider, notify };
};
