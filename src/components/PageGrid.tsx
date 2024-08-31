import styled from "styled-components";

import { ChildrenPropsType } from "../types";

const DIV_PageGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 300px auto;
  column-gap: 20px;
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    row-gap: 50px;
  }
`;

const PageGrid = ({ children }: ChildrenPropsType) => {
  return <DIV_PageGrid>{children}</DIV_PageGrid>;
};

export default PageGrid;
