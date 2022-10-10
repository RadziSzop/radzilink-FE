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
export interface ICustomSettings {
  customUrl: string | null;
  password: string | null;
  deleteAfterRead: boolean;
  analitics: boolean;
}
export interface IContext {
  customSettings: ICustomSettings;
  setCustomSettings: React.Dispatch<React.SetStateAction<ICustomSettings>>;
}
export const SettingsContext = createContext<IContext | null>(null);

export const MainPage = () => {
  const [linkBarError, setLinkBarError] = useState<string>("");
  const [customSettingsError, setCustomSettingsError] = useState<string>("");
  const [isCustomize, setIsCustomize] = useState<boolean>(false);
  console.log(isCustomize);

  const [customSettings, setCustomSettings] = useState<ICustomSettings>({
    customUrl: "",
    password: "",
    deleteAfterRead: false,
    analitics: false,
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
          <CustomizeButton
            setIsCustomize={setIsCustomize}
            isCustomize={isCustomize}
          />
          <CustomizeForm isCustomize={isCustomize} />
        </StyledCustomizeContainer>
      </StyledContainer>
    </SettingsContext.Provider>
  );
};
