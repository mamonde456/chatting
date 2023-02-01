import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../../../firebase";
import { IChatProps } from "../../types/chat";

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .chatting {
    color: rgba(0, 0, 0, 0.5);
  }
`;
export default function Chat({ roomName, roomId, roomIdFn }: IChatProps) {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const getMessages = () => {
    try {
      const newMessageQuery = query(
        collection(db, `room-${roomId}`),
        orderBy("createdAt")
      );
      return onSnapshot(newMessageQuery, (snapshot) => {
        setMessages([]);
        snapshot.forEach((doc) => {
          setMessages((prev) => [...prev, doc.data()]);
        });
      });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <li onClick={() => roomIdFn(roomId)}>
      <div className="avatar"></div>
      <TextBox>
        <span>{roomName}</span>
        <span className="chatting">
          {messages[messages.length - 1]?.message}
        </span>
      </TextBox>
    </li>
  );
}
