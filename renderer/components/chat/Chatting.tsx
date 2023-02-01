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
import { auth, db } from "../../../firebase";

const Wrapper = styled.div`
  /* height: 100vh; */
  /* position: relative; */
  display: flex;
  flex-direction: column;
`;
const MsgList = styled.ul`
  width: 400px;
  height: 80vh;
  padding: 10px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;
const Li = styled.li<{ flex: boolean }>`
  /* max-width: 200px; */
  /* width: 100%; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  /* position: relative; */
  align-self: ${(props) => (props.flex ? "flex-end" : "flex-start")};

  .name {
    margin-bottom: 10px;
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

const Form = styled.form`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 10px;
  input {
    text-indent: 10px;
    font-size: 18px;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  button {
    border: solid 1px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    height: 100%;
  }
`;

export default function Chatting({ id }) {
  const [user, setUser] = useState({
    email: "",
    id: "",
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

  useEffect(() => {
    const newMessageQuery = query(
      collection(db, `room-${id}`),
      orderBy("createdAt")
    );
    // const unsubscribe = onSnapshot(collection(db, `room-${id}`), (snapshot) => {
    //   snapshot.forEach((doc) => {
    //     console.log(doc.data());
    //     setMessages((prev) => [doc.data(), ...prev]);
    //   });
    // });
    return onSnapshot(newMessageQuery, (snapshot) => {
      setMessages([]);
      snapshot.forEach((doc) => {
        setMessages((prev) => [...prev, doc.data()]);
      });
    });
    // return unsubscribe();
  }, [id]);

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
    <Wrapper>
      <MsgList>
        {messages?.map((el) => (
          <Li key={el.createdAt} flex={el.owner.name === user.email}>
            <span className="name">{el.owner.name.split("@")[0]}</span>
            <MessageBox>
              <span
                className={
                  el.owner.name === user.email
                    ? "message meArrow"
                    : "message youArrow"
                }
              >
                {el.message}
              </span>
            </MessageBox>
          </Li>
        ))}
      </MsgList>

      <Form>
        <input type="text" name="message" onChange={onChange} value={message} />
        <button type="submit" onClick={onSubmit}>
          send
        </button>
      </Form>
    </Wrapper>
  );
}
