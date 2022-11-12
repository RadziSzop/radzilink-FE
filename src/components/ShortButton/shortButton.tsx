import { StyledShortButton, StyledButtonText } from "./styledShortButton";
import { motion, useAnimationControls } from "framer-motion";
import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMorph } from "../../hooks/useMorph";
import { notification } from "../Notification/notification";
import { SettingsContext } from "../../views/MainPage/MainPage";
import { validateCustomSettings, validateLinkBar } from "./newLinkValidation";
import { CustomSettingsContext } from "../../types/customSettings";

interface IProps {
  copyUrl: boolean;
  linkBarValue: string;
  isLoading: boolean;
  setCopyUrl: React.Dispatch<React.SetStateAction<boolean>>;
  setLinkBarValue: React.Dispatch<React.SetStateAction<string>>;
  setLinkBarError: Dispatch<SetStateAction<string>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setCustomSettingsError: Dispatch<SetStateAction<string>>;
}
export const ShortButton = ({
  linkBarValue,
  copyUrl,
  isLoading,
  setLinkBarValue,
  setLinkBarError,
  setCopyUrl,
  setIsLoading,
  setCustomSettingsError,
}: IProps) => {
  const [buttonText, setButtonText] = useState<string>("Short Me!");
  const { NotificationProvider, notify } = notification();
  const [shortenedUrl, setShortenedUrl] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const animationControler = useAnimationControls();
  const settingsContext: CustomSettingsContext | null =
    useContext(SettingsContext);
  if (!settingsContext) return null;
  const { customSettings } = settingsContext;
  const morphUrl = useMorph();

  const ShortButtonVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      backgroundColor: "#ec6e55",
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
      backgroundColor: "#bc543e",
      scale: 1.05,
    },
    click: {
      scale: 0.95,
    },
  };

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
  const handleSubmit = async () => {
    const { customSettingsErrors, normalizedCustomSettings } =
      await validateCustomSettings(customSettings);
    const { linkBarErrors, normalizedLinkBarValue } = await validateLinkBar(
      linkBarValue
    );
    setLinkBarError(linkBarErrors);
    setCustomSettingsError(customSettingsErrors);
    if (linkBarErrors || customSettingsErrors) {
      setIsError(true);
      await animationControler.start("error");
      animationControler.start("visible");
      setIsError(false);
    } else {
      setIsLoading(true);
      axios
        .post(`${import.meta.env.VITE_SERVERURL}/url`, {
          destinationUrl: normalizedLinkBarValue,
          ...normalizedCustomSettings,
        })
        .then(function (response) {
          morphUrl(
            linkBarValue,
            response.data.link,
            setLinkBarValue,
            setIsLoading,
            setCopyUrl
          );
          setShortenedUrl(response.data.link);
          setCustomSettingsError("");
          setLinkBarError("");
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response.status === 409) {
            notify("This url is already taken.");
          } else {
            notify(error.message);
          }
        });
    }
  };
  return (
    <>
      <StyledShortButton
        isLoading={isLoading}
        as={motion.div}
        onClick={async () => {
          if (!isError) {
            if (copyUrl) {
              await navigator.clipboard.writeText(shortenedUrl);
              setCopyUrl(false);
              notify("Copied!");
            } else {
              handleSubmit();
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
      >
        <StyledButtonText>{buttonText}</StyledButtonText>
      </StyledShortButton>
      <NotificationProvider time={1500} />
    </>
  );
};
