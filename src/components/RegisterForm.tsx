import { type FormEvent, useState } from "react";
import styled from "styled-components";
import { Link } from "@tanstack/react-router";

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

const P_GuideToLogin = styled.p`
  font-size: 14px;

  a {
    padding-left: 3px;
    text-decoration: underline;
  }
`;

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
          <DIV_FormGroup>
            <label htmlFor="password">パスワード（確認用）</label>
            <input
              type="password"
              value={passwordConfirmation}
              onChange={(e: any) => setPasswordConfirmation(e.target.value)}
            />
          </DIV_FormGroup>
        </DIV_FormFieldWrap>
        <BUTTON_Button type="submit" primary={true}>
          新規登録
        </BUTTON_Button>
      </FORM_Form>
      <div>
        <P_GuideToLogin>
          すでにアカウントをお持ちの方は<Link to="/login">ログイン</Link>
        </P_GuideToLogin>
      </div>
    </DIV_AuthBox>
  );
};

export default RegisterForm;
