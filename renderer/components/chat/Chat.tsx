import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { IChatProps, IMessage } from "../../types/chat/chat";
import ChatView from "./views/ChatView";

export default function Chat({ roomName, roomId, roomIdFn }: IChatProps) {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const getMessages = () => {
    try {
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
    } catch (e) {
      return;
    }
  };
  useEffect(() => {
    getMessages();
  }, []);

  const ChatProps: IChatProps = {
    roomName,
    roomId,
    roomIdFn,
    messages,
  };

  return <ChatView {...ChatProps} />;
}
