import { ReactNode } from "react";
import styled from "styled-components";

interface ContainerProps {
  children: ReactNode;
}

const DIV_Container = styled.div`
  padding: 15px;
  margin: 0 auto;
  max-width: 1000px;
`;

const Container = ({ children }: ContainerProps) => {
  return <DIV_Container>{children}</DIV_Container>;
};

export default Container;
