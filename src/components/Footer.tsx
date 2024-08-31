import styled from "styled-components";

import Container from "./Container";

const FOOTER_Footer = styled.footer`
  background-color: rgb(25, 25, 74);
`;

const P_Copyright = styled.p`
  color: #fff;
  text-align: center;
`;

const Footer = () => {
  return (
    <FOOTER_Footer>
      <Container>
        <P_Copyright>©️ 南風荘 2024</P_Copyright>
      </Container>
    </FOOTER_Footer>
  );
};

export default Footer;
