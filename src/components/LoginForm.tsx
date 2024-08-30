import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Button from "./button/Button";

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
    <form onSubmit={handleFormSubmit}>
      <div>
        <div>
          <label htmlFor="email">メールアドレス</label>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div>
        <div>
          <label htmlFor="password">パスワード</label>
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <Button type="submit" text="ログイン" $primary={true} />
    </form>
  );
};

export default LoginForm;
