import { StyledShortButton, StyledButtonText } from "./styledShortButton";
import { motion, useAnimationControls } from "framer-motion";
import { z } from "zod";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useMorph } from "../../hooks/useMorph";
interface IProps {
  copyUrl: boolean;
  setCopyUrl: React.Dispatch<React.SetStateAction<boolean>>;
  linkBarValue: string;
  setLinkBarValue: React.Dispatch<React.SetStateAction<string>>;
  validationError: string;
  SetValidationError: Dispatch<SetStateAction<string>>;
}

export const ShortButton = ({
  linkBarValue,
  setLinkBarValue,
  SetValidationError,
  validationError,
  copyUrl,
  setCopyUrl,
}: IProps) => {
  const [buttonText, setButtonText] = useState<string>("Short me!");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
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
      backgroundColor: "rgb(236, 117, 93)",
      transition: { opacity: { type: "linear", delay: 1.5 } },
    },
    error: {
      opacity: 1,
      backgroundColor: "rgb(255, 0, 0)",
      rotateZ: [0, -5, 5, -5, 0],
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
      morphUrl(linkBarValue, shortenedUrl, setLinkBarValue, setIsLoading);
    }
  }, [shortenedUrl]);
  useEffect(() => {
    animationControler.start("visible");
  }, []);
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
      SetValidationError("Url is invalid!");
      await animationControler.start("error");
      await animationControler.start("visible");
      return;
    } else {
      SetValidationError("");
    }
    animationControler.start("click");
    setIsLoading(true);
    axios
      .post("http://localhost:3000/url ", {
        url: linkValidation.data,
      })
      .then(function (response) {
        setShortenedUrl(`localhost:5173/${response.data.encodedUrlIndex}`);
        setCopyUrl(true);
        // TODO: Animate Copy button
      })
      .catch(function (error) {
        setIsLoading(false);
        SetValidationError(error.message);
      });
  };
  return (
    <>
      <StyledShortButton
        isLoading={isLoading}
        as={motion.div}
        onClick={() => {
          if (!copyUrl) {
            validateInput();
          } else {
            navigator.clipboard.writeText(shortenedUrl);
            //TODO: change when you can copy url
            setCopyUrl(false);
          }
        }}
        layout
        variants={ShortButtonVariants}
        initial="hidden"
        animate={animationControler}
        whileHover="hover"
        whileTap="click"
        transition={{}}
      >
        <StyledButtonText>{buttonText}</StyledButtonText>
      </StyledShortButton>
    </>
  );
};
