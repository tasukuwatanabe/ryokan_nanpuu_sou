import styled from "styled-components";
import { ChildrenPropsType } from "../types";

const DIV_Container = styled.div`
  padding: 15px;
  margin: 0 auto;
  max-width: 1000px;
`;

const Container = ({ children }: ChildrenPropsType) => {
  return <DIV_Container>{children}</DIV_Container>;
};

export default Container;
