import styled from "styled-components";

import Chevron from "../icon/Chevron";

const Button_Button = styled.button`
  width: 100%;
  height: 40px;
  color: #fff;
  background-color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  transition-duration: 0.1s;

  @media (any-hover: hover) {
    &:hover {
      color: ${(props) => props.color};
      background-color: #fff;
    }
  }
  svg {
    width: 10px;
    height: 10px;
  }
`;

Button_Button.defaultProps = {
  color: "#ad9b3c",
};

interface ButtonProps {
  text: string;
  url: string;
}

const Button = ({ text, url }: ButtonProps) => {
  return (
    <Button_Button as="a" href={url}>
      <span>{text}</span>
      <Chevron />
    </Button_Button>
  );
};

export default Button;
