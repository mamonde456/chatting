import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../firebase";
import useUser from "../../hook/useUser";
import { IMessage } from "../../types/chat/chat";
import { IChattingProps, IChattingViewProps } from "../../types/chat/chatting";
import ChattingView from "./views/ChattingView";

export default function Chatting({
  roomId,
  setRoomId,
  setIsRemove,
}: IChattingProps) {
  const [user, setUser] = useState({
    email: "",
    id: "",
    name: "",
  });
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const scrollRef = useRef<HTMLUListElement>(null);
  const currentUser = useUser();

  const getCurrentUserName = async () => {
    try {
      const roomQuery = query(collection(db, "users"));
      return onSnapshot(roomQuery, (snapshot) => {
        snapshot.forEach((doc: any) => {
          if (doc.data().id === currentUser.uid) {
            setUser({
              email: doc.data().email,
              id: doc.data().id,
              name: doc.data().name,
            });
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUserName();
  }, []);

  useEffect(() => {
    if (!scrollRef) return;
    const el = scrollRef.current;
    if (el.scrollHeight > 0) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const newMessageQuery = query(
      collection(db, `room-${roomId}`),
      orderBy("createdAt")
    );
    return onSnapshot(newMessageQuery, (snapshot) => {
      setMessages([]);
      snapshot.forEach((doc: any) => {
        setMessages((prev) => [...prev, doc.data()]);
      });
    });
  }, [roomId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (message === "") return;
    try {
      const messageRef = await addDoc(collection(db, `room-${roomId}`), {
        message,
        owner: {
          email: currentUser.email,
          id: currentUser.uid,
          name: user.name,
        },
        createdAt: Date(),
      });
      await setDoc(
        doc(db, `room-${roomId}`, messageRef.id),
        {
          id: messageRef.id,
        },
        { merge: true }
      );
      setMessage("");
    } catch (e) {
      console.error(e);
    }
  };
  const onDelete = async () => {
    window.confirm("정말 삭제하시겠습니까?");
    try {
      let chattingId = [];
      const roomQuery = query(collection(db, `room-${roomId}`));
      onSnapshot(roomQuery, (snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data().id);
          chattingId = [...chattingId, doc.data().id];
        });
      });
      await chattingId.forEach((id) => {
        deleteDoc(doc(db, `room-${roomId}`, `${id}`));
      });
      await deleteDoc(doc(db, "rooms", `${roomId}`));
      setRoomId(null);
      setIsRemove((prev) => !prev);
    } catch (error) {
      return window.confirm("채팅방 삭제에 실패했습니다.");
    }
  };

  const ChattingViewProps: IChattingViewProps = {
    scrollRef,
    messages,
    user,
    message,
    onDelete,
    onChange: (e) => {
      const {
        currentTarget: { value },
      } = e;
      setMessage(value);
    },
    onSubmit,
  };

  return <ChattingView {...ChattingViewProps} />;
}
