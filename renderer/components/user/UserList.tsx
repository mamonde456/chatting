import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../../../firebase";
import useUser from "../../hook/useUser";
import { IListProps, IMenuProps } from "../../types/common";
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
  /* max-height: 400px; */
  /* overflow-y: scroll; */
  display: flex;
  flex-direction: column;
  gap: 10px;
  .currentUser {
    position: relative;
    margin-bottom: 30px;
    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      padding: 10px;
      width: 90%;
      border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    }
  }
`;

const User = styled.li`
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

export default function UserList({ setId, setRoomId }: IListProps) {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);
  const currentUser = useUser();

  const getUserList = async () => {
    try {
      setUsers([]);
      const roomQuery = query(collection(db, "users"), orderBy("name"));
      return onSnapshot(roomQuery, (snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().id === currentUser.uid) {
            setName(doc.data().name);
          } else {
            setUsers((prev) => [doc.data(), ...prev]);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserList();
  }, []);

  const onClick = async (user) => {
    try {
      await setDoc(doc(db, `rooms`, `${currentUser.uid}`), {
        owner: user,
        enterUsers: [
          {
            name,
            id: currentUser.uid,
            email: currentUser.email,
            createdAt: Date.now(),
          },
          user,
        ],
        createdAt: Date(),
        id: user.id,
        roomName: user.name,
      });
      setId(1);
      setRoomId(user.id);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <Title>유저 목록</Title>

      <hr />
      <Users>
        <User className="currentUser">
          <div className="avatar"></div>
          <div>{name}</div>
        </User>
        {users?.map((user) => (
          <User key={user.id} onClick={() => onClick(user)}>
            <div className="avatar"></div>
            <div>{user.name}</div>
          </User>
        ))}
      </Users>
    </Wrapper>
  );
}
