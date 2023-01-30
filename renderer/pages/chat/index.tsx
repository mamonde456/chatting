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
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState({
    email: "",
    id: "",
  });

  useEffect(() => {
    try {
      setRooms([]);
      const roomQuery = query(collection(db, "rooms"));
      return onSnapshot(roomQuery, (snapshot) => {
        snapshot.forEach((doc) => {
          setRooms((prev) => [doc.data(), ...prev]);
        });
      });
    } catch (error) {
      console.log(error);
    }
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

  const onSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
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
      <form>
        <input type="text" name="room" onChange={onChange} value={room} />
        <button type="submit" onClick={onSubmit}>
          Create Chatting Room
        </button>
      </form>
      <div>
        {rooms ? (
          rooms?.map((el) => (
            <Link href={`chat/${el.id}`} key={el.id}>
              {el.roomName}
            </Link>
          ))
        ) : (
          <p>개설된 채팅방이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
