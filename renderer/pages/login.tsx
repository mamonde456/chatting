import React, { useState } from "react";
import { emailMatch, passwordMatch } from "../until";
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase.js";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";

const Form = styled.form`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 12px;
    color: #9d1212;
    margin-bottom: 10px;
  }
  hr {
    width: 150px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  }
  input {
    width: 150px;
    border-radius: 5px;
  }
  a {
    font-size: 14px;
  }
`;

export default function login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = e;
    setUser({ ...user, [name]: value });
  };
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, user.email, user.password);
      })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("user-not-found")) {
          setErrorMsg("이메일을 찾을 수 없습니다.");
        } else if (errorMessage.includes("wrong-password"))
          setErrorMsg("비밀번호가 맞지 않습니다.");
      });
  };
  return (
    <>
      <Form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            type="text"
            id="email"
            name="email"
            onChange={onChange}
            value={user.email}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            required
            type="text"
            id="password"
            name="password"
            onChange={onChange}
            value={user.password}
          />
        </div>
        <span>{errorMsg}</span>
        <input
          type="submit"
          value="login"
          disabled={
            passwordMatch(user.password) && emailMatch(user.email)
              ? false
              : true
          }
        />
        <hr />
        <Link href="/sign-up">Sign Up</Link>
      </Form>
    </>
  );
}
