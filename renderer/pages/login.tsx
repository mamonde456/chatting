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

export default function login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);
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
      .catch((error) => {
        const errorMessage = error.message;
        if (errorMessage.includes("user-not-found")) {
          console.log("없는 이메일");
        }
        console.log(error);
      });
    router.push("/");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" name="email" onInput={onChange} value={user.email} />
        <input
          type="text"
          name="password"
          onInput={onChange}
          value={user.password}
        />
        <input
          type="submit"
          value="login"
          disabled={
            passwordMatch(user.password) && emailMatch(user.email)
              ? false
              : true
          }
        />
        <Link href="/sign-up">Sign Up</Link>
      </form>
      <button>구글 로그인</button>
      <button>깃허브 로그인</button>
    </>
  );
}
