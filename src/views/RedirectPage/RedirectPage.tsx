import axios from "axios";
import { useParams } from "react-router-dom";
import { StyledRedirectHeader, StyledRedirectSpan } from "./styledRedirectPage";

export const RedirectPage = () => {
  const { url } = useParams();
  (async () => {
    axios
      .get(`http://localhost:3000/url/${url}`)
      .then(({ data }) => {
        window.location.replace(data.url);
      })
      .catch(async (error) => {
        throw new Error(await error);
      });
  })();
  return (
    <StyledRedirectHeader>
      <StyledRedirectSpan>You </StyledRedirectSpan>
      are being
      <br />
      <StyledRedirectSpan>Redirected</StyledRedirectSpan>
    </StyledRedirectHeader>
  );
};
