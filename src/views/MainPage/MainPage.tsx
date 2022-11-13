import { LinkBar } from "../../components/LinkBar/linkBar";
import {
  StyledLinkBarContainer,
  StyledContainer,
  StyledCustomizeContainer,
  StyledDiscription,
} from "./styledMainPage";
import { motion } from "framer-motion";
import { AnimatedText } from "../../components/AnimatedText/animatedText";
import { ErrorText } from "../../components/ErrorText/errorText";
import { createContext, useState } from "react";
import { CustomizeButton } from "../../components/Customize/CustomizeButton/customizeButton";
import { CustomizeForm } from "../../components/Customize/CustomizeForm/customizeForm";
import {
  CustomSettings,
  CustomSettingsContext,
} from "../../types/customSettings";

export const SettingsContext = createContext<CustomSettingsContext | null>(
  null
);

export const MainPage = () => {
  const [linkBarError, setLinkBarError] = useState<string>("");
  const [customSettingsError, setCustomSettingsError] = useState<string>("");
  const [isCustomize, setIsCustomize] = useState<boolean>(false);
  const [customSettings, setCustomSettings] = useState<CustomSettings>({
    customUrl: "",
    password: "",
    deleteAfterRead: false,
    deleteAfterDate: false,
    deleteAfterTime: false,
    analitics: false,
    date: "",
    time: "",
  });

  return (
    <SettingsContext.Provider value={{ customSettings, setCustomSettings }}>
      <StyledContainer>
        <AnimatedText fontSize="4rem" colorTo="rgb(221, 109, 86)" type="h1">
          Radzi Link
        </AnimatedText>
        <StyledDiscription
          as={motion.h2}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 1.2,
              duration: 0.7,
            },
          }}
          layout
        >
          Simple and private link shortener
        </StyledDiscription>
        <StyledLinkBarContainer as={motion.div}>
          <LinkBar
            setLinkBarError={setLinkBarError}
            setCustomSettingsError={setCustomSettingsError}
          />
        </StyledLinkBarContainer>
        <ErrorText errorText={linkBarError} />

        <StyledCustomizeContainer>
          <CustomizeButton setIsCustomize={setIsCustomize} />
        </StyledCustomizeContainer>
        {isCustomize && (
          <CustomizeForm customSettingsError={customSettingsError} />
        )}
      </StyledContainer>
    </SettingsContext.Provider>
  );
};
