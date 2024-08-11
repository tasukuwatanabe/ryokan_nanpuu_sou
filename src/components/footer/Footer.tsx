import styled from "styled-components";

import Container from "../Container";

const FOOTER_Footer = styled.footer`
  text-align: center;
  color: #fff;
  background-color: rgb(25, 25, 74);
`;

const Footer = () => {
  return (
    <FOOTER_Footer>
      <Container>©️ 南風荘 2024</Container>
    </FOOTER_Footer>
  );
};

export default Footer;
