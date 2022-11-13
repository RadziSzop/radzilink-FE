import styled from "styled-components";
interface IProps {
  customSettings: boolean;
  disabled?: boolean;
}
export const StyledSwitch = styled.div<IProps>`
  min-width: 52.5px;
  width: 52.5px;
  height: 32.5px;
  position: relative;
  background-color: red;
  background-color: ${(props) =>
    props.disabled
      ? "rgb(240,240,240)"
      : props.customSettings
      ? "rgb(237, 193, 145)"
      : "rgba(155, 155, 155, 0.4)"};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  padding: 4px;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  justify-content: ${({ customSettings }) =>
    customSettings ? "end" : "start"};
`;
export const StyledHandle = styled.div<IProps>`
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 15px;
`;
