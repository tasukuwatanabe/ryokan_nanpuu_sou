import styled from "styled-components";

import Chevron from "../icon/Chevron";

const Button_Button = styled.button<{ $primary?: boolean }>`
  width: 100%;
  height: 40px;
  color: ${(props) => (props.$primary ? "#fff" : "#333")};
  background-color: ${(props) => (props.$primary ? props.color : "#fafafa")};
  border: 1px solid ${(props) => (props.$primary ? props.color : "#aaa")};
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;
  transition-duration: 0.1s;
  cursor: pointer;

  @media (any-hover: hover) {
    &:hover {
      opacity: 0.6;
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
  url?: string;
  color?: string;
  $primary?: boolean;
  onClick?: () => void;
}

const Button = ({ text, url, color, $primary, onClick }: ButtonProps) => {
  return (
    <Button_Button
      as={url ? "a" : "button"}
      href={url || undefined}
      color={color}
      $primary={$primary}
      onClick={onClick}
    >
      <span>{text}</span>
      {$primary && <Chevron />}
    </Button_Button>
  );
};

export default Button;
