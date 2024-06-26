import axios from "axios";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatedText } from "../../components/AnimatedText/animatedText";
import { PasswordField } from "../../components/PasswordField/passwordField";
import {
  StyledPasswordHeader,
  StyledPasswordSpan,
  StyledRedirectHeader,
  StyledRedirectSpan,
  StyledPassTextContainer,
} from "./styledRedirectPage";
export const RedirectPage = () => {
  const [isProtected, setIsProtected] = useState<boolean>(false);
  const { index } = useParams();
  const animationControler = useAnimationControls();
  const navigate = useNavigate();

  const containerVariatns = {
    hide: {
      opacity: 0,
      x: 70,
      transition: {
        x: {
          duration: 0.5,
        },
      },
    },
  };
  const getUrlData = async () => {
    axios
      .get(`${import.meta.env.VITE_SERVERURL}/url/${index}`)
      .then(({ data }) => {
        if (!data.isProtected) {
          window.location.replace(data.data.destinationUrl);
        } else {
          setIsProtected(true);
        }
      })
      .catch(async (error) => {
        if (error.response.status === 404) {
          navigate("/404");
        }
        throw new Error(await error);
      });
  };
  useEffect(() => {
    getUrlData();
  }, []);
  return (
    <>
      {isProtected ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <StyledPassTextContainer
            as={motion.div}
            animate={animationControler}
            variants={containerVariatns}
          >
            <StyledPasswordHeader
              as={motion.h2}
              initial={{ y: -4, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              This link is
            </StyledPasswordHeader>
            <StyledPasswordSpan
              as={motion.span}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                rotate: [0, -1, 1, -1, 0],
                transition: {
                  opacity: { delay: 0.6, type: "spring", stiffness: 30 },
                  rotate: { delay: 0.7 },
                },
              }}
            >
              protected
            </StyledPasswordSpan>
          </StyledPassTextContainer>
          <PasswordField animationControler={animationControler} />
        </div>
      ) : (
        <StyledRedirectHeader as={motion.h2} drag>
          <StyledRedirectSpan as={motion.span} drag>
            You{" "}
          </StyledRedirectSpan>
          are being
          <br />
          <StyledRedirectSpan>
            <AnimatedText
              colorFrom="#ffffff"
              colorTo="#ec6e55"
              fontSize="inherit"
              textAlign="right"
            >
              Redirected
            </AnimatedText>
          </StyledRedirectSpan>
        </StyledRedirectHeader>
      )}
    </>
  );
};
