import styled from "styled-components";
import { Link } from "@tanstack/react-router";

import { useAuth } from "../contexts/Auth";
import Container from "./Container";
import { doSignOut } from "../firebase/auth";

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
`;

const LINK_Logo = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 22px;
  font-family: "Sawarabi Mincho", serif;
  font-weight: 700;
`;

const LINK_NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
`;

const SPAN_SignOut = styled.span`
  text-decoration: underline;
  font-size: 13px;
  cursor: pointer;
`;

const Header = () => {
  const { currentUser, userLoggedIn } = useAuth();

  return (
    <HEADER_Header>
      <Container>
        <DIV_HeaderInner>
          <H1_Title>
            <LINK_Logo to="/">南風荘</LINK_Logo>
          </H1_Title>
          <nav>
            <UL_NavList>
              <li>
                {userLoggedIn && currentUser ? (
                  <p>
                    currentUser.email [
                    <SPAN_SignOut onClick={doSignOut}>ログアウト</SPAN_SignOut>]
                  </p>
                ) : (
                  <LINK_NavLink to="/login">ログイン</LINK_NavLink>
                )}
              </li>
            </UL_NavList>
          </nav>
        </DIV_HeaderInner>
      </Container>
    </HEADER_Header>
  );
};

export default Header;
