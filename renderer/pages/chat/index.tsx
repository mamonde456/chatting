import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";

export default function chat() {
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]) as any;
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState({
    email: "",
    id: "",
  });

  useEffect(() => {
    const roomQuery = query(collection(db, "rooms"));
    onSnapshot(roomQuery, (snapshot) => {
      snapshot.forEach((doc) => {
        setRooms((prev: any) => [doc.data(), ...prev]);
      });
    });
    console.log(rooms);
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ email: user.email, id: user.uid });
      } else {
        console.log("user not found");
      }
    });
  }, []);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setRoom(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "rooms"), {
        roomName: room,
        owner: { name: user.email, id: user.id },
        enterUsers: [],
        createdAt: Date(),
      });
      await setDoc(
        doc(db, "rooms", docRef.id),
        {
          id: docRef.id,
        },
        { merge: true }
      );
      setRoom("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="room" onChange={onChange} value={room} />
        <input type="submit" value="Create Chatting Room" />
      </form>
      <div>
        {rooms?.map((el) => (
          <Link href={`chat/${el.id}`} key={el.roomName}>
            {el.roomName}
          </Link>
        ))}
      </div>
    </div>
  );
}
