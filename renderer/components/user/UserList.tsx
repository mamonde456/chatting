import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";

export default function UserList() {
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const getUserList = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      setUsers((prev) => [doc.data(), ...prev]);
    });
  };
  useEffect(() => {
    // const user = auth.currentUser;
    // if (user) {
    //   console.log(user);
    //   setUser(user);
    // } else {
    //   console.log("로그인한 유저가 없음");
    // }
    // setUsers([]);
    // getUserList();
  }, []);
  return (
    <>
      <p>dd</p>
      {users?.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </>
  );
}
