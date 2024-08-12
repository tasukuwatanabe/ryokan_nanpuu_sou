import styled from "styled-components";

import { ChildrenPropsType } from "../types";

const DIV_PageGrid = styled.div`
  display: grid;
  grid-template-columns: 350px auto;
  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    row-gap: 50px;
  }
`;

const PageGrid = ({ children }: ChildrenPropsType) => {
  return <DIV_PageGrid>{children}</DIV_PageGrid>;
};

export default PageGrid;
