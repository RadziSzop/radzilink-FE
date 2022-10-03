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
}
// TODO: Disable changing linkBarValue when morphing
export const ShortButton = ({
  linkBarValue,
  setLinkBarValue,
  setValidationError,
  copyUrl,
  setCopyUrl,
}: IProps) => {
  const [buttonText, setButtonText] = useState<string>("Short me!");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotification, setIsNotification] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  // const animationControler = useAnimationControls();
  const [activeVariant, setActiveVariant] = useState<string>("visible");
  useEffect(() => {
    console.log(activeVariant);
  });
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
      backgroundColor: "rgb(236, 117, 93)",
      transition: { opacity: { type: "linear", delay: 1.5 } },
    },
    error: {
      opacity: 1,
      backgroundColor: ["#ff0000", "#ec755d"],
      rotate: [0, -5, 5, -5, 0],
      x: [0, -5, 5, -5, 0],
      transition: {
        backgroundCoor: { times: [0, 0.8] },
        x: { duration: 0.75 },
      },
    },
    hover: {
      // backgroundColor: "rgb(188, 84, 62)",
      backgroundColor: "rgb(106, 250, 10)",
      scale: 1.05,
    },
    click: {
      scale: 0.95,
    },
  };

  // useEffect(() => {
  //   if (isError) {
  //     setTimeout(() => {
  //       setIsError(false);
  //     }, 1000);
  //   }
  // }, [isError]);

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
  const validateInput = async () => {
    const linkValidation = await linkBarSchema.safeParseAsync(
      linkBarValue.includes("https://") || linkBarValue.includes("http://")
        ? linkBarValue
        : `https://${linkBarValue}`
    );
    if (!linkValidation.success) {
      console.log("VALIDATION ERROR");
      setValidationError("Url is invalid!");
      // setIsError(true);
      // ustawic frames
      setActiveVariant("error");
      setTimeout(() => {
        setActiveVariant("visible");
        console.log("TIMEOUTING!");
      }, 1000);
      return;
    } else {
      setValidationError("");
      setIsError(false);
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
          // if (!isError) {
          if (!copyUrl) {
            validateInput();
          } else {
            navigator.clipboard.writeText(shortenedUrl);
            setIsNotification(true);
            setCopyUrl(false);
          }
          // }
        }}
        layout
        variants={ShortButtonVariants}
        initial="hidden"
        animate={activeVariant}
        whileHover={activeVariant !== "error" ? "hover" : ""}
        whileTap={activeVariant !== "error" ? "click" : ""}
      >
        <StyledButtonText>{buttonText}</StyledButtonText>
      </StyledShortButton>
      {isNotification && (
        // && isError
        <Notification
          message="Copied!"
          time={1400}
          disabler={setIsNotification}
        />
      )}
    </>
  );
};
