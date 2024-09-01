import styled from "styled-components";

import { ChildrenPropsType } from "@/types";

const DIV_Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Wrapper = ({ children }: ChildrenPropsType) => {
  return <DIV_Wrapper>{children}</DIV_Wrapper>;
};

export default Wrapper;
