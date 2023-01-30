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

function Home() {
  const [id, setId] = useState(0);
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
            <li onClick={() => setId(() => item.id)}>{item.list}</li>
          ))}
        </List>
      </ListBox>
      <div>{listArray[id].component}</div>
    </Wrapper>
  );
}

export default Home;
