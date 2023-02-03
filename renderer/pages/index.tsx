import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import ChatList from "../components/chat/ChatList";
import Menu from "../components/common/Menu";
import UserList from "../components/user/UserList";
import useResize from "../hook/useResize";
import useUser from "../hook/useUser";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 2fr;
`;

const LoginText = styled.p`
  padding: 10px;
`;
function Home() {
  const [id, setId] = useState(0);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { height } = useResize();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, [auth]);

  return (
    <Wrapper>
      <Menu setId={setId} height={height} />
      <div>
        {isLoggedIn ? (
          <>
            {id === 0 ? (
              <UserList setId={setId} setRoomId={setRoomId} />
            ) : (
              <ChatList setRoomId={setRoomId} roomId={roomId} />
            )}
          </>
        ) : (
          <LoginText>로그인을 해주세요</LoginText>
        )}
      </div>
    </Wrapper>
  );
}

export default Home;
