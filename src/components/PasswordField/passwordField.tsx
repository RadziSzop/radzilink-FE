import {
  StyledPasswordField,
  StyledPasswordFieldContainer,
  StyledSvg,
} from "./styledPasswordField";
import lock from "../../assets/lock.svg";
import { AnimationControls, motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import { notification } from "../Notification/notification";
import { GetProtectedUrlResponse } from "../../types/requests";
interface IProps {
  animationControler: AnimationControls;
}
export const PasswordField = ({ animationControler }: IProps) => {
  const [password, setPassword] = useState<string>("");
  const [isWrongPassword, setIsWrongPassword] = useState<boolean>(false);
  const { NotificationProvider, notify } = notification();
  const { index } = useParams();
  const containerVariatns = {
    hide: {
      opacity: [1, 0],
      width: ["100%", "5%"],
      x: 50,
      transition: {
        x: {
          duration: 0.7,
        },
      },
    },
  };
  const handleWrongPass = () => {
    setIsWrongPassword(true);
    setTimeout(() => {
      setIsWrongPassword(false);
    }, 1350);
  };
  const handleClick = async () => {
    axios
      .post<GetProtectedUrlResponse>(
        `${import.meta.env.VITE_SERVERURL}/url/${index}`,
        {
          password: password,
        }
      )
      .then(async ({ data }) => {
        if (data.success) {
          await animationControler.start("hide");
          window.location.replace(data.data.destinationUrl);
        } else {
          handleWrongPass();
        }
      })
      .catch(() => {
        notify("Password is incorrect");
      });
  };
  return (
    <StyledPasswordFieldContainer
      as={motion.div}
      variants={containerVariatns}
      animate={animationControler}
      onKeyDown={(event) => {
        if (!isWrongPassword && event.key === "Enter") {
          handleClick();
        }
      }}
    >
      <StyledPasswordField
        autoFocus
        as={motion.input}
        aria-label="Submit password button"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: ["0%", "100%"],
          opacity: 1,
          transition: {
            type: "spring",
            delay: 0.5,
            stiffness: 50,
          },
        }}
        type="password"
        placeholder="Enter password"
        value={password}
        fontColor={Boolean(isWrongPassword)}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      <StyledSvg
        src={lock}
        alt=""
        as={motion.img}
        whileHover={isWrongPassword ? {} : { scale: 2 }}
        transition={{ opacity: { delay: 1.3, duration: 0.4 } }}
        initial={{ opacity: 0 }}
        animate={
          isWrongPassword
            ? {
                x: [0, -3, 3, -3, 3, -3, 0],
                scale: 1.75,
                opacity: 1,
              }
            : { scale: 1.75, opacity: 1 }
        }
        whileTap={isWrongPassword ? {} : { scale: 1.85 }}
        onClick={() => {
          if (!isWrongPassword) {
            handleClick();
          }
        }}
      />
      <NotificationProvider time={2400} />
    </StyledPasswordFieldContainer>
  );
};
