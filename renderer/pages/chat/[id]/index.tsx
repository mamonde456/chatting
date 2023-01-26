import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { auth, db } from "../../../../firebase";

export default function ChattingRoom() {
  const [user, setUser] = useState({
    email: "",
    id: "",
  });
  const router = useRouter();
  const { id } = router.query;
  const userEnter = async ({ email, uid }) => {
    // const roomUpdateRef = doc(db, "room", id);
    // await updateDoc(roomUpdateRef, { enterUser: [{ name: email, id: uid }] });
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser({ email: user.email, id: user.uid });
    });
  }, []);

  const onClick = async () => {
    const docRef = doc(db, "rooms", `${id}`);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    const enterPrevUser = docSnap.data().enterUsers;
    await setDoc(
      doc(db, "rooms", `${id}`),
      {
        enterUsers: [...enterPrevUser, user],
      },
      { merge: true }
    );
  };
  return (
    <div>
      hello 2<button onClick={onClick}>click</button>
      <form>
        <input type="text" name="text" />
        <input type="submit" value="send" />
      </form>
    </div>
  );
}
