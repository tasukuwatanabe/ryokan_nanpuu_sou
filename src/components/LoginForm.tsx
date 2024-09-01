import { type ChangeEvent, type FormEvent, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import styled from "styled-components";

import { doSignInWithEmailAndPassword } from "../firebase/auth";
import Button from "./button/Button";
import { useAuth } from "../contexts/authContext";

const DIV_AuthBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 30px 25px 40px;
  border: 1px solid #c0c0c0;
`;

const H2_Heading = styled.h2`
  margin-bottom: 30px;
`;

const DIV_FormFieldWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-bottom: 40px;
`;

const DIV_FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;

  input {
    height: 40px;
  }
`;

const BUTTON_Button = styled(Button)`
  margin-bottom: 15px;
`;

const P_GuideToRegister = styled.p`
  font-size: 14px;

  a {
    padding-left: 3px;
    text-decoration: underline;
  }
`;

const LoginForm = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userLoggedIn) {
      try {
        await doSignInWithEmailAndPassword(email, password);

        setEmail("");
        setPassword("");

        navigate({ to: "/" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <DIV_AuthBox>
      <H2_Heading>ログイン</H2_Heading>
      <form onSubmit={handleFormSubmit}>
        <DIV_FormFieldWrap>
          <DIV_FormGroup>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
          </DIV_FormGroup>
          <DIV_FormGroup>
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
          </DIV_FormGroup>
        </DIV_FormFieldWrap>
        <BUTTON_Button type="submit" primary={true}>
          ログイン
        </BUTTON_Button>
      </form>
      <div>
        <P_GuideToRegister>
          アカウントをお持ちでない方は<Link to="/register">新規登録</Link>
        </P_GuideToRegister>
      </div>
    </DIV_AuthBox>
  );
};

export default LoginForm;
