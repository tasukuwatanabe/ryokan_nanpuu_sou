import styled from "styled-components";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  href?: never;
  primary?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

type LinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
  primary?: boolean;
  children: ReactNode;
  onClick?: never;
};

const isLinkProps = (props: ButtonProps | LinkProps): props is LinkProps =>
  "href" in props;

const Button = (props: ButtonProps | LinkProps) => {
  if (isLinkProps(props)) {
    const { children, primary, ...otherProps } = props;
    return (
      <a {...otherProps}>
        <span>{children}</span>
      </a>
    );
  }

  const { children, type = "button", primary, ...otherProps } = props;
  return (
    <button type={type} {...otherProps}>
      <span>{children}</span>
    </button>
  );
};

const StyledButton = styled(Button)`
  color: ${(props) => (props.primary ? "#fff" : "#333")};
  background-color: ${(props) => (props.primary ? "#ad9b3c" : "#fafafa")};
  border: 1px solid ${(props) => (props.primary ? "#ad9b3c" : "#aaa")};

  width: 100%;
  height: 40px;
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
`;

export default StyledButton;
