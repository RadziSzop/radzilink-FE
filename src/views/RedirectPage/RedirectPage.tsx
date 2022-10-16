import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AnimatedH1 } from "../../components/AnimatedText/animatedText";
import { PasswordField } from "../../components/PasswordField/passwordField";
import {
  StyledPasswordHeader,
  StyledPasswordSpan,
  StyledRedirectHeader,
  StyledRedirectSpan,
} from "./styledRedirectPage";
export const RedirectPage = () => {
  const [isProtected, setIsProtected] = useState<boolean>(false);
  const { index } = useParams();
  const getUrlData = async () => {
    axios
      .get(`http://localhost:3000/url/${index}`)
      .then(({ data }) => {
        console.log(data);
        if (!data.isProtected) {
          window.location.replace(data.data.destinationUrl);
        } else {
          setIsProtected(true);
        }
      })
      .catch(async (error) => {
        throw new Error(await error);
      });
  };
  useEffect(() => {
    getUrlData();
  }, []);
  return (
    <>
      {isProtected ? (
        <>
          <StyledPasswordHeader>
            This link is
            <StyledPasswordSpan> protected</StyledPasswordSpan>
          </StyledPasswordHeader>
          <PasswordField />
        </>
      ) : (
        <StyledRedirectHeader>
          <StyledRedirectSpan>You </StyledRedirectSpan>
          are being
          <br />
          <StyledRedirectSpan>
            <AnimatedH1
              colorFrom="#ffffff"
              colorTo="#dd6d56"
              fontSize="5.5rem"
              textAlign="right"
            >
              Redirected
            </AnimatedH1>
          </StyledRedirectSpan>
        </StyledRedirectHeader>
      )}
    </>
  );
};
