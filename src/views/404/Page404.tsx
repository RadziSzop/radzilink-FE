import { Styled404Header, Styled404Span } from "./styled404Page";

export const Page404 = () => {
  //TODO: Create time based progress Bar
  setTimeout(() => {
    window.location.replace("http://localhost:5173");
  }, 4000);
  return (
    <>
      <Styled404Span>404</Styled404Span>
      <br />
      <Styled404Header> Page not found!</Styled404Header>
    </>
  );
};
