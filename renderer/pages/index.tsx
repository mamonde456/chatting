import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import ChatList from "../components/chat/ChatList";
import Menu from "../components/common/Menu";
import UserList from "../components/user/UserList";
import useUser from "../hook/useUser";
import { listArray } from "../until/menu";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 2fr;
`;
const Components = styled.div`
  /* padding-left: 100px; */
  padding-top: 50px;
`;

const LoginText = styled.p`
  padding: 10px;
`;
function Home() {
  const [id, setId] = useState(0);
  const [roomId, setRoomId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedIn = useUser();
  useEffect(() => {
    setIsLoggedIn(loggedIn ? true : false);
  }, []);

  return (
    <Wrapper>
      <Menu setId={setId} />
      <Components>
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
      </Components>
    </Wrapper>
  );
}

export default Home;
