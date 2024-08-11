import styled from "styled-components";

import Container from "./Container";

const HEADER_Header = styled.header`
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
`;

const DIV_HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const H1_Title = styled.h1`
  font-size: 20px;
`;

const UL_NavList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 50px;
  list-style-type: none;
  @media screen and (max-width: 1023px) {
    display: none;
  }
`;

const Header = () => {
  return (
    <HEADER_Header>
      <Container>
        <DIV_HeaderInner>
          <H1_Title>南風荘</H1_Title>
          <nav>
            <UL_NavList>
              <li>MENU1</li>
              <li>MENU2</li>
              <li>MENU3</li>
              <li>MENU4</li>
            </UL_NavList>
          </nav>
        </DIV_HeaderInner>
      </Container>
    </HEADER_Header>
  );
};

export default Header;
