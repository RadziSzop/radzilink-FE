import { StyledShortButton, StyledButtonText } from "./styledShortButton";
import { motion } from "framer-motion";
import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMorph } from "../../hooks/useMorph";
interface IProps {
  linkBarValue: string;
  setLinkBarValue: React.Dispatch<React.SetStateAction<string>>;
}
interface shuffledBaseLink {
  value: string;
  sort: number;
  index: number;
}
export const ShortButton = ({ linkBarValue, setLinkBarValue }: IProps) => {
  const [buttonText, setButtonText] = useState<string>("Short me!");
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [copyUrl, setCopyUrl] = useState<boolean>(false);
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
    },
    error: { opacity: 1, backgroundColor: "rgb(255, 0, 0)" },
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

  const validateInput = async () => {
    const linkValidation = await linkBarSchema.safeParseAsync(
      linkBarValue.includes("https://") || linkBarValue.includes("http://")
        ? linkBarValue
        : `https://${linkBarValue}`
    );
    if (!linkValidation.success) {
      setButtonText("Url is invalid!");
      setIsError(true);
      setTimeout(() => {
        setButtonText("Short me!");
        setIsError(false);
      }, 2000);
      return;
    }
    setIsLoading(true);
    axios
      .post("http://localhost:3000/url ", {
        url: linkValidation.data,
      })
      .then(function (response) {
        setShortenedUrl(`localhost:5173/${response.data.encodedUrlIndex}`);
        setCopyUrl(true);
        setButtonText("Copy");
        // TODO: Animate Copy button
      })
      .catch(function (error) {
        setIsLoading(false);
        setIsError(true);
        setButtonText(error.response.data);
        setTimeout(() => {
          setButtonText("Short me!");
          setIsError(false);
        }, 2000);
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
            setButtonText("Short me!");
          }
        }}
        layout
        variants={ShortButtonVariants}
        initial="hidden"
        animate={!isError ? "visible" : "error"}
        whileHover="hover"
        whileTap="click"
        transition={{ opacity: { type: "linear", delay: 1.5 } }}
      >
        <StyledButtonText>{buttonText}</StyledButtonText>
      </StyledShortButton>
    </>
  );
};
