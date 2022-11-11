import { motion } from "framer-motion";
import { useContext } from "react";
import { CustomSettingsContext } from "../../../types/customSettings";
import { SettingsContext } from "../../../views/MainPage/MainPage";
import { ErrorText } from "../../ErrorText/errorText";
import { CustomToggle } from "./DeleteToggle/customToggle";
import { LinkInput } from "./LinkInput/linkInput";
import {
  StyledCustomizeForm,
  StyledCustomizeInput,
  StyledCustomizeLabel,
  StyledInputContainer,
} from "./styledCustomizeForm";
interface IProps {
  customSettingsError: string;
}
export const CustomizeForm = ({ customSettingsError }: IProps) => {
  const settingsContext: CustomSettingsContext | null =
    useContext(SettingsContext);
  if (!settingsContext) return null;
  const { customSettings, setCustomSettings } = settingsContext;
  const formVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        height: { duration: 0.5, delay: 0 },
        delay: 0.2,
        duration: 0.3,
      },
    },
  };
  const containerVariatns = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.4,
      },
    },
  };
  return (
    <>
      <StyledCustomizeForm
        as={motion.div}
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div>
          <StyledCustomizeLabel as={motion.label}>
            Delete link after:
          </StyledCustomizeLabel>
          <StyledInputContainer as={motion.div} variants={containerVariatns}>
            <StyledCustomizeLabel as={motion.label}>
              First use
            </StyledCustomizeLabel>
            <CustomToggle
              type="deleteAfterRead"
              aria-label="Toggle for deleting link after first use"
            />
          </StyledInputContainer>
          <StyledInputContainer as={motion.div} variants={containerVariatns}>
            <StyledCustomizeLabel as={motion.label}>Date</StyledCustomizeLabel>
            {customSettings.deleteAfterDate && (
              <StyledCustomizeInput
                as={motion.input}
                disabled={!customSettings.deleteAfterDate}
                type="date"
                aria-label="Date input for delete link after time"
                animate={{ width: 105, opacity: 1 }}
                initial={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                value={customSettings.date}
                onChange={(e) => {
                  setCustomSettings((prevState) => {
                    const newState = { ...prevState };
                    newState.date = e.target.value;
                    return newState;
                  });
                }}
              />
            )}
            <CustomToggle
              type="deleteAfterDate"
              disable={"deleteAfterTime"}
              aria-label="Toggle for deleting link after time"
            />
          </StyledInputContainer>
          <StyledInputContainer as={motion.div} variants={containerVariatns}>
            <StyledCustomizeLabel as={motion.label}>Time</StyledCustomizeLabel>
            {customSettings.deleteAfterTime && (
              <StyledCustomizeInput
                as={motion.input}
                aria-label="Time input for delete link after time"
                type="time"
                disabled={!customSettings.deleteAfterTime}
                value={customSettings.time}
                animate={{ width: 105, opacity: 1 }}
                initial={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 15 }}
                onChange={(e) => {
                  setCustomSettings((prevState) => {
                    const newState = { ...prevState };
                    newState.time = e.target.value;
                    return newState;
                  });
                }}
              />
            )}
            <CustomToggle
              type="deleteAfterTime"
              disable={"deleteAfterDate"}
              aria-label="Toggle for deleting link after date"
            />
          </StyledInputContainer>
        </div>
        <div>
          <StyledInputContainer as={motion.div} variants={containerVariatns}>
            <StyledCustomizeLabel as={motion.label}>
              Custom Link
              {/* TODO: fix invalid custom links */}
            </StyledCustomizeLabel>
            <LinkInput type="customUrl" placeholder="Leave for default" />
          </StyledInputContainer>

          <StyledInputContainer as={motion.div} variants={containerVariatns}>
            <StyledCustomizeLabel as={motion.label}>
              Password
            </StyledCustomizeLabel>
            <LinkInput
              type="password"
              isPassword={true}
              placeholder="Leave for no password"
            />
          </StyledInputContainer>
          <StyledInputContainer as={motion.div} variants={containerVariatns}>
            <StyledCustomizeLabel as={motion.label}>
              Create link for analitics
            </StyledCustomizeLabel>
            <CustomToggle
              type="analitics"
              disabled={true}
              aria-label="Toggle for creating link for analitics"
            />
          </StyledInputContainer>
          <ErrorText errorText={customSettingsError} />
        </div>
      </StyledCustomizeForm>
    </>
  );
};
