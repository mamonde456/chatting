import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { INavBarViewProps } from "../../types/common/common";
import NavBarView from "./views/NavBarView";

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const onLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("로그아웃 완료");
      })
      .catch((error) => {
        console.log("로그아웃실패");
      });
  };

  const navBarViewProps: INavBarViewProps = {
    isLoggedIn,
    onLogout,
  };
  return <NavBarView {...navBarViewProps} />;
}
