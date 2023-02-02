import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../../firebase";
import useResize from "../../hook/useResize";
import { IListProps } from "../../types/common";
import UserList from "../user/UserList";
import Chat from "./Chat";
import Chatting from "./Chatting";
import CreateChatUsers from "./CreateChatUsers";

const Wrapper = styled.div`
  display: flex;
  flex: 2;
  /* flex-basis: 30%; */
  /* flex-grow: 1; */
`;

const ChatListWrap = styled.div`
  width: 100%;
  max-height: 800px;
  overflow-y: scroll;
  position: relative;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  padding: 30px 20px;
`;

const ListBox = styled.div``;
const Chats = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  li {
    width: 100%;
    padding: 15px 30px;
    display: flex;
    align-items: center;
    gap: 20px;
    &:hover {
      background-color: rgba(137, 137, 137, 0.3);
    }
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 18px;
      background-color: black;
    }
  }
`;

const ChatIcon = styled.svg`
  padding: 10px;
  width: 50px;
  height: 50px;
  fill: rgb(62, 62, 62);
  position: absolute;
  right: 10px;
  top: 10px;
  &:hover {
    border-radius: 15px;
    background-color: rgba(137, 137, 137, 0.3);
  }
`;

const UsersModal = styled.div`
  /* height: 100vh; */
  border: solid 1px rgba(0, 0, 0, 0.1);
  background-color: white;
  /* position: absolute; */
  /* top: 0; */
  /* left: 0; */
`;

export default function ChatList({ roomId, setRoomId }: IListProps) {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState({
    email: "",
    id: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    if (currentUser) {
      console.log(currentUser);
      setUser({
        email: currentUser.email,
        id: currentUser.uid,
      });
    } else {
      console.log("로그인한 유저가 없음");
    }
  }, []);

  useEffect(() => {
    try {
      setRooms([]);
      const roomQuery = query(collection(db, "rooms"));
      return onSnapshot(roomQuery, (snapshot) => {
        snapshot.forEach((doc) => {
          setRooms((prev) => [doc.data(), ...prev]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <Wrapper>
      <ChatListWrap>
        {isOpen ? (
          <UsersModal>
            <CreateChatUsers isOpenFn={setIsOpen} setRoomId={setRoomId} />
          </UsersModal>
        ) : (
          <>
            <Title>채팅</Title>
            <ChatIcon
              onClick={() => setIsOpen((prev) => !prev)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512"
            >
              <path d="M208 0C322.9 0 416 78.8 416 176C416 273.2 322.9 352 208 352C189.3 352 171.2 349.7 153.9 345.8C123.3 364.8 79.13 384 24.95 384C14.97 384 5.93 378.1 2.018 368.9C-1.896 359.7-.0074 349.1 6.739 341.9C7.26 341.5 29.38 317.4 45.73 285.9C17.18 255.8 0 217.6 0 176C0 78.8 93.13 0 208 0zM164.6 298.1C179.2 302.3 193.8 304 208 304C296.2 304 368 246.6 368 176C368 105.4 296.2 48 208 48C119.8 48 48 105.4 48 176C48 211.2 65.71 237.2 80.57 252.9L104.1 277.8L88.31 308.1C84.74 314.1 80.73 321.9 76.55 328.5C94.26 323.4 111.7 315.5 128.7 304.1L145.4 294.6L164.6 298.1zM441.6 128.2C552 132.4 640 209.5 640 304C640 345.6 622.8 383.8 594.3 413.9C610.6 445.4 632.7 469.5 633.3 469.9C640 477.1 641.9 487.7 637.1 496.9C634.1 506.1 625 512 615 512C560.9 512 516.7 492.8 486.1 473.8C468.8 477.7 450.7 480 432 480C350 480 279.1 439.8 245.2 381.5C262.5 379.2 279.1 375.3 294.9 369.9C322.9 407.1 373.9 432 432 432C446.2 432 460.8 430.3 475.4 426.1L494.6 422.6L511.3 432.1C528.3 443.5 545.7 451.4 563.5 456.5C559.3 449.9 555.3 442.1 551.7 436.1L535.9 405.8L559.4 380.9C574.3 365.3 592 339.2 592 304C592 237.7 528.7 183.1 447.1 176.6L448 176C448 159.5 445.8 143.5 441.6 128.2H441.6z" />
            </ChatIcon>

            <Chats>
              {rooms ? (
                rooms?.map((el) => (
                  <Chat
                    key={el.id}
                    roomName={el.roomName}
                    roomId={el.id}
                    roomIdFn={setRoomId}
                  />
                ))
              ) : (
                <p>개설된 채팅방이 없습니다.</p>
              )}
            </Chats>
          </>
        )}
      </ChatListWrap>
      {roomId && (
        <Chatting roomId={roomId} setRoomId={setRoomId} setRooms={setRooms} />
      )}
    </Wrapper>
  );
}
