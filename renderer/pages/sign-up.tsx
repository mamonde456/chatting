import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { emailMatch, passwordMatch } from "../until";

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

export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (user.password !== user.confirmPassword) {
      return setErrorMsg("비밀번호가 같지 않습니다.");
    }
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async (userCredential) => {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          name: user.name,
          email: userCredential.user.email,
          createdAt: Date.now(),
          id: userCredential.user.uid,
        });

        return router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("email-already-in-use")) {
          setErrorMsg(
            "이미 존재하는 이메일입니다. 다른 이메일을 사용해주세요."
          );
        }
      });
  };
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">name</label>
        <input
          required
          type="text"
          id="name"
          name="name"
          onInput={onChange}
          value={user.name}
        />
      </div>
      <div>
        <label htmlFor="email">email</label>
        <input
          required
          type="text"
          id="email"
          name="email"
          onInput={onChange}
          value={user.email}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          required
          type="text"
          id="password"
          name="password"
          onInput={onChange}
          value={user.password}
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          required
          type="text"
          id="confirmPassword"
          name="confirmPassword"
          onInput={onChange}
          value={user.confirmPassword}
        />
      </div>
      <span>{errorMsg}</span>
      <input
        type="submit"
        value="sign up"
        disabled={
          passwordMatch(user.password) && emailMatch(user.email) ? false : true
        }
      />
      <hr />
      <Link href="/login">Login</Link>
    </Form>
  );
}
