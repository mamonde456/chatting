import { IUser } from "../user/user";

export interface ICreateChatUserProps {
  isOpenFn: (boolean) => void;
  setRoomId: (string) => void;
}

export interface ICreateChatUserViewProps {
  clickUsers: IUser[];
  users: IUser[];
  isActive: boolean;
  createdRoom: () => void;
  isOpenFn: (boolean) => void;
  setClickUsers: (IUser) => void;
  userRemove: (user: IUser) => void;
  onClick: (user: IUser) => void;
}
export interface IEnterUser {
  createdAt: number;
  email: string;
  id: string;
  name: string;
}
