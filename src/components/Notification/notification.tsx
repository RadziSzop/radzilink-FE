import { motion, useAnimationControls } from "framer-motion";
import { NotificationContainer } from "./styledNotification";
interface IProps {
  time: number;
  message: string;
}
export const notification = () => {
  const animationControler = useAnimationControls();
  const NotificationProvider = ({ message, time }: IProps) => {
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
      <NotificationContainer
        as={motion.div}
        variants={NotificationVariants}
        animate={animationControler}
        initial="hidden"
      >
        {message}
      </NotificationContainer>
    );
  };

  const notify = async () => {
    await animationControler.start("visible");
    await animationControler.start("hidden");
  };
  return { NotificationProvider, notify };
};
