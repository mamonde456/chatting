import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase";

export default function ChattingRoom() {
  const [user, setUser] = useState({
    email: "",
    id: "",
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  const enterUsers = async () => {
    try {
      const docRef = doc(db, "rooms", `${id}`);
      await updateDoc(docRef, {
        enterUsers: arrayUnion(user),
      });
    } catch (error) {
      console.log("채팅방을 찾을 수 없습니다.");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser({ email: user.email, id: user.uid });
    });
    enterUsers();
  }, [user]);

  useEffect(() => {
    const newMessageQuery = query(collection(db, `room-${id}`));
    onSnapshot(newMessageQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        setMessages((prev: any) => [doc.data(), ...prev]);
      });
    });
  }, []);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setMessage(value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message === "") return;
    console.log(message);
    const messageRef = await addDoc(collection(db, `room-${id}`), {
      message,
      owner: { name: user.email, id: user.id },
      createdAt: Date.now(),
    });
    console.log(messageRef.id);
    await setDoc(
      doc(db, "rooms", messageRef.id),
      {
        id: messageRef.id,
      },
      { merge: true }
    );
    setMessage("");
  };

  return (
    <div>
      <div>
        {messages?.map((el) => (
          <p key={el.id}>
            <span>{el.owner.name}</span>
            <span>{el.message}</span>
          </p>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" name="message" onChange={onChange} value={message} />
        <input type="submit" value="send" />
      </form>
    </div>
  );
}
