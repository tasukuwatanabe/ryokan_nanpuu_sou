import { useState } from "react";
import styled from "styled-components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "@tanstack/react-router";

import { auth } from "../firebase";
import Button from "./button/Button";

const DIV_AuthBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px 25px;
  border: 1px solid #c0c0c0;
`;

const FORM_Form = styled.form``;

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credential);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DIV_AuthBox>
      <FORM_Form onSubmit={handleFormSubmit}>
        <DIV_FormFieldWrap>
          <DIV_FormGroup>
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </DIV_FormGroup>
          <DIV_FormGroup>
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
          </DIV_FormGroup>
        </DIV_FormFieldWrap>
        <BUTTON_Button type="submit" primary={true}>
          ログイン
        </BUTTON_Button>
      </FORM_Form>
      <div>
        <P_GuideToRegister>
          アカウントをお持ちでない方は<Link to="/register">新規登録</Link>
        </P_GuideToRegister>
      </div>
    </DIV_AuthBox>
  );
};

export default LoginForm;
