import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { emailMatch, passwordMatch } from "../until";

export default function SignUp() {
  const [user, setUser] = useState({
    name: "",
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
      .then(async (userCredential) => {
        console.log(userCredential);
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
        console.log(error);
      });
  };
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">name</label>
      <input
        type="text"
        id="name"
        name="name"
        onInput={onChange}
        value={user.name}
      />
      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
        name="email"
        onInput={onChange}
        value={user.email}
      />
      <label htmlFor="password">password</label>
      <input
        type="text"
        id="password"
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
      <Link href="/login">Login</Link>
    </form>
  );
}
