import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import useResize from "../../hook/useResize";
import { IChatListProps, IRooms } from "../../types/chat/chatList";
import { IListProps } from "../../types/common/common";
import ChatListView from "./views/ChatListView";

export default function ChatList({ roomId, setRoomId }: IListProps) {
  const [rooms, setRooms] = useState<IRooms[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const { height } = useResize();
  useEffect(() => {
    try {
      const roomQuery = query(collection(db, "rooms"));
      return onSnapshot(roomQuery, (snapshot) => {
        setRooms([]);
        snapshot.forEach((doc: any) => {
          setRooms((prev) => [doc.data(), ...prev]);
        });
      });
    } catch (error) {
      window.confirm("채팅방을 가져오지 못했습니다.");
    }
  }, [isRemove]);

  const ChatListProps: IChatListProps = {
    isOpen,
    setIsOpen,
    rooms,
    setRooms,
    roomId,
    setRoomId,
    setIsRemove,
    height,
  };
  return <ChatListView {...ChatListProps} />;
}
