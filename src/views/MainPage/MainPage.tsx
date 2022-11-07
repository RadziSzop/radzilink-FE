import { LinkBar } from "../../components/LinkBar/linkBar";
import {
  StyledLinkBarContainer,
  StyledContainer,
  StyledCustomizeContainer,
} from "./styledMainPage";
import { motion } from "framer-motion";
import { AnimatedH1 } from "../../components/AnimatedText/animatedText";
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
  //TODO: implement customSettingsError
  console.log(customSettingsError);
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
        <AnimatedH1 fontSize="3.5rem" colorTo="rgb(221, 109, 86)">
          Link Shortener
        </AnimatedH1>
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
        {isCustomize && <CustomizeForm />}
      </StyledContainer>
    </SettingsContext.Provider>
  );
};
