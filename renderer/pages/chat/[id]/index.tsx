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
import styled from "styled-components";
import { auth, db } from "../../../../firebase";

const MsgList = styled.ul`
  width: 300px;
  display: flex;
  flex-direction: column;
  li {
    /* max-width: 200px; */
    /* width: 100%; */
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    .meRight {
      align-items: flex-end;
    }
    .youLeft {
      align-items: flex-start;
    }
    .name {
      margin-bottom: 10px;
    }
  }
`;

const MessageBox = styled.div`
  .message {
    border-radius: 8px;
    max-width: 250px;
    padding: 10px;
    background-color: #cdcdcd;
    position: relative;
  }
  .meArrow {
    &::before {
      content: "";
      position: absolute;
      right: -18px;
      top: 8px;
      width: 0;
      height: 0;
      border-bottom: 8px solid transparent;
      border-top: 8px solid transparent;
      border-left: 10px solid #cdcdcd;
      border-right: 10px solid transparent;
    }
  }
  .youArrow {
    &::before {
      content: "";
      position: absolute;
      left: -18px;
      top: 8px;
      width: 0;
      height: 0;
      border-bottom: 8px solid transparent;
      border-top: 8px solid transparent;
      border-left: 10px solid transparent;
      border-right: 10px solid #cdcdcd;
    }
  }
`;

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
    if (!id) return;
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
    // enterUsers();
  }, []);

  // useEffect(() => {
  //   const newMessageQuery = query(
  //     collection(db, `room-${id}`),
  //     orderBy("createdAt")
  //   );
  //   // const unsubscribe = onSnapshot(collection(db, `room-${id}`), (snapshot) => {
  //   //   snapshot.forEach((doc) => {
  //   //     console.log(doc.data());
  //   //     setMessages((prev) => [doc.data(), ...prev]);
  //   //   });
  //   // });
  //   return onSnapshot(newMessageQuery, (snapshot) => {
  //     setMessages([]);
  //     snapshot.forEach((doc) => {
  //       setMessages((prev) => [...prev, doc.data()]);
  //     });
  //   });
  //   // return unsubscribe();
  // }, []);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setMessage(value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (message === "") return;
    try {
      const messageRef = await addDoc(collection(db, `room-${id}`), {
        message,
        owner: { name: user.email, id: user.id },
        createdAt: Date(),
      });
      await setDoc(
        doc(db, `room-${id}`, messageRef.id),
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

  return (
    <div>
      <div>{}</div>
      <MsgList>
        {/* {messages?.map((el) => (
          <div key={el.createdAt}>
            <span>{el.owner.name.split("@")[0]}</span>
            <span>{el.message}</span>
          </div>
        ))} */}
        <li className="meRight">
          <span className="name">garam</span>
          <MessageBox>
            <span className="message">dafsdf</span>
          </MessageBox>
        </li>
        <li className="meRight">
          <span className="name">garam</span>
          <MessageBox>
            <span className="message meArrow">dafsdf</span>
          </MessageBox>
        </li>
        <li className="youLeft">
          <span className="name">test</span>
          <MessageBox>
            <span className="message youArrow">dafsdf</span>
          </MessageBox>
        </li>
      </MsgList>

      <form>
        <input type="text" name="message" onChange={onChange} value={message} />
        <button type="submit" onClick={onSubmit}>
          send
        </button>
      </form>
    </div>
  );
}
