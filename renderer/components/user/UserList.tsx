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
import useResize from "../../hook/useResize";
import useUser from "../../hook/useUser";
import { IListProps, IMenuProps } from "../../types/common/common";
import { IUser } from "../../types/user/user";
import { IUserListProps, IUserListViewProps } from "../../types/user/userList";
import UserListView from "./views/UserListView";

export default function UserList({ setId, setRoomId }: IListProps) {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<IUser[]>([]);
  const currentUser = useUser();
  const resize = useResize();

  const getUserList = async () => {
    try {
      setUsers([]);
      const roomQuery = query(collection(db, "users"), orderBy("name"));
      return onSnapshot(roomQuery, (snapshot) => {
        snapshot.forEach((doc: any) => {
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

  const onClick = async (user: IUser) => {
    try {
      await setDoc(doc(db, `rooms`, `${user.id}`), {
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
  const userListViewProps: IUserListViewProps = {
    resize,
    name,
    users,
    onClick,
  };
  return <UserListView {...userListViewProps} />;
}
