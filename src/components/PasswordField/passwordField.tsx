import {
  StyledPasswordField,
  StyledPasswordFieldContainer,
  StyledSvg,
} from "./styledPasswordField";
import lock from "../../assets/lock.svg";
import unlock from "../../assets/unlock.svg";
import { motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { notification } from "../Notification/notification";

export const PasswordField = () => {
  const { index } = useParams();
  const { NotificationProvider, notify } = notification();

  const [password, setPassword] = useState<string>("");
  const handleClick = async () => {
    axios
      .post(`http://localhost:3000/url/${index}`, {
        password: password,
      })
      .then(function ({ data }) {
        if (data.success) {
          window.location.replace(data.data.destinationUrl);
        } else {
          notify("Wrong password!");
        }
      })
      .catch(function (error) {
        notify(error.message);
        throw new Error(error);
      });
  };
  return (
    <StyledPasswordFieldContainer>
      <StyledPasswordField
        type="password"
        placeholder="Enter passwrod"
        value={password}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      <StyledSvg
        // src={isLock ? unlock : lock}
        src={lock}
        alt=""
        as={motion.img}
        whileHover={{ scale: 2 }}
        animate={{ scale: 1.75 }}
        whileTap={{ scale: 1.85 }}
        onClick={() => {
          handleClick();
        }}
      />
      <NotificationProvider time={14000} />
    </StyledPasswordFieldContainer>
  );
};
