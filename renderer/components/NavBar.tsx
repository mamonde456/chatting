import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../../firebase";

const Header = styled.header`
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
  nav {
    display: flex;
    gap: 30px;
  }
`;

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
    <Header>
      <nav>
        <Link href="/">home</Link>
        {isLoggedIn ? (
          <>
            {" "}
            <span onClick={onLogout}>logout</span>
            {/* <Link href="/chat">Chat room</Link> */}
          </>
        ) : (
          <Link href="/login">login</Link>
        )}
      </nav>
    </Header>
  );
}
