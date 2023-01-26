import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "../../firebase";
import { emailMatch, passwordMatch } from "../until";

export default function SignUp() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { name, value },
    } = e;
    setUser({ ...user, [name]: value });
  };
  const router = useRouter();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        console.log(userCredential);
        return router.push("/login");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(error);
      });
  };
  return (
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
        value="sign up"
        disabled={
          passwordMatch(user.password) && emailMatch(user.email) ? false : true
        }
      />
      <Link href="/sign-up">Login</Link>
    </form>
  );
}
