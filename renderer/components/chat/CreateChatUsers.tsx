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
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import useUser from "../../hook/useUser";
import {
  ICreateChatUserProps,
  ICreateChatUserViewProps,
} from "../../types/chat/chat";
import { IUser } from "../../types/user/user";
import CreateChatUsersView from "./views/CreateChatUsersView";

export default function CreateChatUsers({
  isOpenFn,
  setRoomId,
}: ICreateChatUserProps) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    id: "",
  });
  const [users, setUsers] = useState<IUser[]>([]);
  const [clickUsers, setClickUsers] = useState<IUser[]>([]);
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
        snapshot.forEach((doc: any) => {
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

  const onClick = (user: IUser) => {
    if (clickUsers.includes(user)) {
      return userRemove(user);
    }
    setClickUsers((prev) => [user, ...prev]);
  };

  const userRemove = (user: IUser) => {
    const userArray = clickUsers.filter((item: IUser) => item.id !== user.id);
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

  const CreateUserViewProps: ICreateChatUserViewProps = {
    clickUsers,
    users,
    isActive,
    createdRoom,
    isOpenFn,
    setClickUsers,
    userRemove,
    onClick,
  };
  return <CreateChatUsersView {...CreateUserViewProps} />;
}
