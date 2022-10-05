import { StyledShortButton, StyledButtonText } from "./styledShortButton";
import { motion, useAnimationControls } from "framer-motion";
import { z } from "zod";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMorph } from "../../hooks/useMorph";
import { Notification } from "../Notification/notification";
interface IProps {
  copyUrl: boolean;
  setCopyUrl: React.Dispatch<React.SetStateAction<boolean>>;
  linkBarValue: string;
  setLinkBarValue: React.Dispatch<React.SetStateAction<string>>;
  setValidationError: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ShortButton = ({
  linkBarValue,
  setLinkBarValue,
  setValidationError,
  copyUrl,
  setCopyUrl,
  isLoading,
  setIsLoading,
}: IProps) => {
  const [buttonText, setButtonText] = useState<string>("Short me!");
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const animationControler = useAnimationControls();

  const morphUrl = useMorph();
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const linkBarSchema = z
    .string()
    .regex(regex)
    .max(8192, "Url is too long!")
    .trim();
  const ShortButtonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      backgroundColor: "rgb(236, 117, 93)",
      transition: { opacity: { type: "linear", delay: 1.5 } },
    },
    error: {
      backgroundColor: "#fa3f06",
      rotate: [0, -5, 5, -5, 0],
      x: [0, -5, 5, -5, 0],
      transition: {
        x: { duration: 0.75 },
      },
    },
    hover: {
      backgroundColor: "rgb(188, 84, 62)",
      scale: 1.05,
    },
    click: {
      scale: 0.95,
    },
  };

  useEffect(() => {
    if (shortenedUrl) {
      morphUrl(
        linkBarValue,
        shortenedUrl,
        setLinkBarValue,
        setIsLoading,
        setCopyUrl
      );
    }
  }, [shortenedUrl]);

  useEffect(() => {
    if (copyUrl) {
      setButtonText("Copy");
    } else {
      setButtonText("Short me!");
    }
  }, [copyUrl]);
  useEffect(() => {
    animationControler.start("visible");
  }, []);
  const validateInput = async () => {
    const linkValidation = await linkBarSchema.safeParseAsync(
      linkBarValue.includes("https://") || linkBarValue.includes("http://")
        ? linkBarValue
        : `https://${linkBarValue}`
    );
    if (!linkValidation.success) {
      setValidationError("Url is invalid!");
      animationControler.start("error");
      setIsError(true);
      setTimeout(() => {
        animationControler.start("visible");
        setIsError(false);
      }, 1000);
      return;
    } else {
      setValidationError("");
      // setIsError(false);
    }
    setIsLoading(true);
    axios
      .post("http://localhost:3000/url ", {
        url: linkValidation.data,
      })
      .then(function (response) {
        setShortenedUrl(`localhost:5173/${response.data.encodedUrlIndex}`);
      })
      .catch(function (error) {
        setIsLoading(false);
        setValidationError(error.message);
      });
  };
  return (
    <>
      <StyledShortButton
        isLoading={isLoading}
        as={motion.div}
        onClick={() => {
          if (!isError) {
            if (!copyUrl) {
              validateInput();
            } else {
              navigator.clipboard.writeText(shortenedUrl);
              setIsNotification(true);
              setCopyUrl(false);
            }
          }
        }}
        layout
        variants={ShortButtonVariants}
        initial="hidden"
        animate={animationControler}
        onHoverStart={() => {
          if (!isError) {
            animationControler.start("hover");
          }
        }}
        onHoverEnd={() => {
          if (!isError) {
            animationControler.start("visible");
          }
        }}
        onTapStart={() => {
          if (!isError) {
            animationControler.start("click");
          }
        }}
        // whileHover={activeVariant === "error" ? "" : "hover"}
        // whileTap={activeVariant === "error" ? "" : "click"}
      >
        <StyledButtonText>{buttonText}</StyledButtonText>
      </StyledShortButton>
      {isNotification && (
        <Notification
          message="Copied!"
          time={1400}
          disabler={setIsNotification}
        />
      )}
    </>
  );
};
