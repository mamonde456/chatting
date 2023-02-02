import { auth } from "../../firebase";

export default function useUser() {
  const currentUser = auth.currentUser;
  if (!currentUser) return;
  if (currentUser) {
    return currentUser;
  } else {
    return null;
  }
}
