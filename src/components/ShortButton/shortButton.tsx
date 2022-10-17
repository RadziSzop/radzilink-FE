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
import { IContext, SettingsContext } from "../../views/MainPage/MainPage";
import { validateCustomSettings, validateLinkBar } from "./newLinkValidation";

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
  const settingsContext: IContext | null = useContext(SettingsContext);
  if (!settingsContext) return null;
  const { customSettings } = settingsContext;
  const morphUrl = useMorph();

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
    if (copyUrl) {
      setButtonText("Copy");
    } else {
      setButtonText("Short me!");
    }
  }, [copyUrl]);
  useEffect(() => {
    animationControler.start("visible");
    validateCustomSettings(customSettings);
  }, []);
  const handleSubmit = async () => {
    const { customSettingsErrors, normalizedCustomSettings } =
      await validateCustomSettings(customSettings);
    const { linkBarErrors, normalizedLinkBarValue } = await validateLinkBar(
      linkBarValue
    );
    console.log({ customSettingsErrors, linkBarErrors });
    if (linkBarErrors) {
      setLinkBarError(linkBarErrors);
    }
    if (customSettingsErrors) {
      setCustomSettingsError(customSettingsErrors);
    }
    if (linkBarErrors || customSettingsErrors) {
      setIsError(true);
      await animationControler.start("error");
      animationControler.start("visible");
      setIsError(false);
    } else {
      setIsLoading(true);
      axios
        .post("http://localhost:3000/url ", {
          destinationUrl: normalizedLinkBarValue,
          ...normalizedCustomSettings,
        })
        .then(function (response) {
          console.log(response);
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
        .catch(function (error) {
          setIsLoading(false);
          notify(error.message);
          throw new Error(error);
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
