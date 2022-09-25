import { StyledShortButton, StyledLoadingSvg } from "./styledShortButton";
import { motion } from "framer-motion";
import { z } from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import MySvg from "../../assets/loading.svg";
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
  const [shortenedUrl, setShortenedUrl] = useState<string | undefined>();

  const morphUrl = (
    from: string,
    to: string,
    fromDispatch: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (from.length > to.length) {
      const ticks = to.length;
      const difference: number = from.length - to.length;
      const shuffledBaseLink: shuffledBaseLink | any = to
        .split("")
        .map((value: string, index: number) => ({
          value,
          sort: Math.random(),
          index,
        }))
        .sort((a: shuffledBaseLink, b: shuffledBaseLink) => a.sort - b.sort)
        .map((value: shuffledBaseLink, index: number) => ({ value, index }));
      const times: number[] = [];
      let remaining = difference;
      for (let i = 0; i < ticks - 1; i++) {
        const tickLetters = Math.floor(difference / ticks);
        remaining = remaining - tickLetters;
        times.push(tickLetters);
      }
      times.unshift(remaining);

      let index = 0;
      const test = setInterval(() => {
        if (index >= ticks) {
          clearInterval(test);
          return;
        }
        fromDispatch((prevState: string) => {
          const newLink = (
            prevState.substring(0, shuffledBaseLink[index].index) +
            shuffledBaseLink[index].value +
            prevState.substring(shuffledBaseLink[index].index + 1)
          ).substring(0, prevState.length - times[++index - 1]);
          return newLink;
        });
      }, 50);
    }
  };
  useEffect(() => {
    if (shortenedUrl === undefined) return;
    morphUrl(linkBarValue, shortenedUrl, setLinkBarValue);
  }, [shortenedUrl]);
  const list = {
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
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const linkBarSchema = z
    .string()
    .regex(regex)
    .max(1024, "Url is too long!")
    .trim();

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
        setShortenedUrl(`localhost:3000/url/${response.data.encodedUrlIndex}`);
        console.log(
          `new url: localhost:3000/url/${response.data.encodedUrlIndex}`
        );
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <StyledShortButton
        as={motion.div}
        onClick={validateInput}
        layout
        variants={list}
        initial="hidden"
        animate={!isError ? "visible" : "error"}
        whileHover="hover"
        whileTap="click"
        transition={{ opacity: { type: "linear", delay: 1.5 } }}
      >
        {/* TODO:  change loading svg to border animation */}
        {isLoading ? <StyledLoadingSvg src={MySvg} alt="test" /> : buttonText}
      </StyledShortButton>
    </>
  );
};
