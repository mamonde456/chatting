import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        console.log(user);
        const userName = user.email.split("@");
        setEmail(userName[0]);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃 완료");
      })
      .catch((error) => {
        console.log("로그아웃실패");
      });
  };
  return (
    <>
      <Link href="/">home</Link>
      {isLoggedIn ? (
        <>
          {" "}
          <span onClick={onLogout}>logout</span>
          <Link href="/chat">Chat room</Link>
        </>
      ) : (
        <Link href="/login">login</Link>
      )}
      {isLoggedIn && <p>어서오세요. {email} 님</p>}
    </>
  );
}
