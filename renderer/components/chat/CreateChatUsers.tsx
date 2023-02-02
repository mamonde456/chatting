import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../../firebase";
import useUser from "../../hook/useUser";
import { ICreateChatUserProps } from "../../types/chat";
import { IUserListProps } from "../../types/user/userList";

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  hr {
    border: none;
    height: 1px;
    background: rgba(0, 0, 0, 0.2);
  }
`;
const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  padding: 10px 0px;
`;

const Users = styled.ul`
  max-height: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 20px;
    &:hover {
      background-color: rgba(137, 137, 137, 0.2);
    }
    .avatar {
      width: 50px;
      height: 50px;
      background-color: black;
      border-radius: 10px;
    }
  }
`;

const ClickUserList = styled.ul`
  max-height: 100px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  li {
    padding: 10px;
    border: solid 1px rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    display: flex;
    gap: 10px;
  }
`;

const XIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
  .btn {
    padding: 10px 30px;
    border: solid 1px black;
    border-radius: 5px;
  }
  .enter {
    opacity: 0.5;
    background-color: rgb(228, 228, 228);
  }
  .cancle {
    background-color: white;
  }
  .acitve {
    opacity: 1;
    background-color: black;
    color: white;
  }
`;

export default function CreateChatUsers({
  isOpenFn,
  setRoomId,
}: ICreateChatUserProps) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    id: "",
  });
  const [users, setUsers] = useState([]);
  const [clickUsers, setClickUsers] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const currentUser = useUser();

  const getUserList = async () => {
    try {
      setUsers([]);
      const roomQuery = query(
        collection(db, "users"),
        where("id", "!=", `${user.id}`)
      );
      return onSnapshot(roomQuery, (snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().id === currentUser.uid) {
            setUser({
              name: doc.data().name,
              email: doc.data().email,
              id: doc.data().id,
            });
          }
          setUsers((prev) => [doc.data(), ...prev]);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    clickUsers.length !== 0 ? setIsActive(true) : setIsActive(false);
  }, [clickUsers]);
  useEffect(() => {
    getUserList();
  }, []);

  const onClick = (user) => {
    if (clickUsers.includes(user)) {
      return userRemove(user);
    }
    setClickUsers((prev) => [user, ...prev]);
  };

  const userRemove = (user) => {
    const userArray = clickUsers.filter((item) => item.id !== user.id);
    setClickUsers(userArray);
  };
  const getUserName = () => {
    let userArray = [];
    clickUsers.forEach((item) => {
      userArray = [...userArray, item.name];
    });
    return userArray.join(",");
  };
  const createdRoom = async () => {
    try {
      if (clickUsers.length === 1) {
        await setDoc(doc(db, `rooms`, `${user.id}`), {
          owner: user,
          enterUsers: [{ ...user, createdAt: Date.now() }, ...clickUsers],
          createdAt: Date(),
          id: user.id,
          roomName: clickUsers[0].name,
        });
        setClickUsers([]);
        setRoomId(user.id);
        return isOpenFn((prev) => !prev);
      }
      const roomName = getUserName();
      const docRef = await addDoc(collection(db, "rooms"), {
        roomName: roomName,
        owner: { name: user.email, id: user.id },
        enterUsers: [{ ...user, createdAt: Date.now() }, ...clickUsers],
        createdAt: Date(),
      });
      await setDoc(
        doc(db, "rooms", docRef.id),
        {
          id: docRef.id,
        },
        { merge: true }
      );
      setClickUsers([]);
      setRoomId(docRef.id);
      return isOpenFn((prev) => !prev);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <Title>대화 상대 선택</Title>
      <ClickUserList>
        {clickUsers.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <XIcon
              onClick={() => userRemove(user)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </XIcon>
          </li>
        ))}
      </ClickUserList>
      <hr />
      <Users>
        {users?.map((user) => (
          <li key={user.id} onClick={() => onClick(user)}>
            <div className="avatar"></div>
            <div>{user.name}</div>
          </li>
        ))}
      </Users>
      <BtnBox>
        <button
          className={isActive ? "btn enter acitve" : "btn enter"}
          disabled={!isActive}
          onClick={createdRoom}
        >
          확인
        </button>
        <button
          className="btn cancle"
          onClick={() => {
            isOpenFn((prev) => !prev);
            setClickUsers([]);
          }}
        >
          취소
        </button>
      </BtnBox>
    </Wrapper>
  );
}
