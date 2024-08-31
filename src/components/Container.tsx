import styled from "styled-components";
import { ChildrenPropsType } from "../types";

const DIV_Container = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 20px;
  margin: 0 auto;
  max-width: 1000px;
`;

const Container = ({ children }: ChildrenPropsType) => {
  return <DIV_Container>{children}</DIV_Container>;
};

export default Container;
