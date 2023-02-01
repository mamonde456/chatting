import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import ChatList from "../components/chat/ChatList";
import UserList from "../components/user/UserList";

const Wrapper = styled.div`
  display: flex;
`;
const ListBox = styled.div`
  padding-top: 50px;
  width: 100px;
  height: 100vh;
  background-color: #d8deeb;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  li {
    width: 100%;
    padding: 10px;
    /* border: solid 1px black; */
  }
`;
const Components = styled.div`
  padding-top: 50px;
`;

const LoginText = styled.p`
  padding: 10px;
`;
function Home() {
  const [id, setId] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    if (currentUser) {
      setIsLoggedIn((prev) => !prev);
    } else {
      setIsLoggedIn((prev) => !prev);
      console.log("로그인한 유저가 없음");
    }
  }, []);

  const listArray = [
    {
      id: 0,
      list: "유저 목록",
      component: <UserList />,
    },
    {
      id: 1,
      list: "채팅방",
      component: <ChatList />,
    },
  ];
  return (
    <Wrapper>
      <ListBox>
        <List>
          {listArray.map((item) => (
            <li key={item.id} onClick={() => setId(() => item.id)}>
              {item.list}
            </li>
          ))}
        </List>
      </ListBox>
      <Components>
        {isLoggedIn ? (
          <>{listArray[id].component}</>
        ) : (
          <LoginText>로그인을 해주세요</LoginText>
        )}
      </Components>
    </Wrapper>
  );
}

export default Home;
