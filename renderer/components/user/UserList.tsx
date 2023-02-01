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
import { IUserListProps } from "../../types/user/userList";

const Wrapper = styled.div`
  width: 400px;
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

export default function UserList({ title, isOpen, isOpenFn }: IUserListProps) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    id: "",
  });
  const [users, setUsers] = useState([]);
  const [clickUsers, setClickUsers] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const getUserList = async () => {
    try {
      setUsers([]);
      const roomQuery = query(
        collection(db, "users"),
        where("id", "!=", `${user.id}`)
      );
      return onSnapshot(roomQuery, (snapshot) => {
        snapshot.forEach((doc) => {
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
    setUsers([]);
    getUserList();
    const currentUser = auth.currentUser;
    if (!currentUser) return;
    const userFilter = users.filter(
      (item) => item.email === currentUser?.email
    );
    const userName = userFilter[0]?.name || currentUser?.email.split("@")[0];
    if (currentUser) {
      console.log(currentUser);
      setUser({
        email: currentUser.email,
        name: userName,
        id: currentUser.uid,
      });
    } else {
      console.log("로그인한 유저가 없음");
    }
  }, []);

  const onDbClick = async (other: any) => {
    if (title) return;
    try {
      await setDoc(doc(db, `rooms`, `${user.id}`), {
        owner: user,
        enterUsers: [{ ...user, createdAt: Date.now() }, other],
        createdAt: Date(),
        id: user.id,
        roomName: other.name,
      });

      router.push(`chat/${user.id}`);
    } catch (e) {
      console.error(e);
    }
  };

  const onClick = (user) => {
    if (!title) return;

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
    for (let i = 0; i < clickUsers.length; i++) {
      userArray = [...userArray, clickUsers[i].name];
    }
    return userArray.join(",");
  };
  const createdRoom = async () => {
    try {
      const roomName = getUserName();
      const docRef = await addDoc(collection(db, "rooms"), {
        roomName: roomName,
        owner: { name: user.email, id: user.id },
        enterUsers: [user, ...clickUsers],
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
      router.push(`chat/${docRef.id}`);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Wrapper>
      <Title>{title ? title : "유저 목록"}</Title>

      <hr />
      <Users>
        {users?.map((user) => (
          <li
            key={user.id}
            onClick={() => onClick(user)}
            onDoubleClick={() => onDbClick(user)}
          >
            <div className="avatar"></div>
            <div>{user.name}</div>
          </li>
        ))}
      </Users>
    </Wrapper>
  );
}
