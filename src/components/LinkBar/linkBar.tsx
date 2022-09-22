import { motion } from "framer-motion";
import { StyledLinkBar } from "./styledLinkBar";
import { z } from "zod";
import { useState } from "react";
import axios from "axios";
export const LinkBar = () => {
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const [linkBarValue, setLinkBarValue] = useState("");
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
      alert("Invalid url");
      return;
    }
    axios
      .post("http://localhost:3000/url ", {
        url: linkValidation.data,
      })
      .then(function (response) {
        setLinkBarValue(`localhost:3000/url/${response.data.encodedUrlIndex}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <StyledLinkBar
        spellCheck={"false"}
        as={motion.input}
        value={linkBarValue}
        onChange={(e) => setLinkBarValue(e.target.value)}
        type="text"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: [70, 700],
          opacity: 1,
        }}
        transition={{
          type: "spring",
          delay: 0.5,
          stiffness: 50,
        }}
      />
      <input
        type="button"
        value="Test"
        style={{ padding: "1rem" }}
        onClick={validateInput}
      />
    </>
  );
};
