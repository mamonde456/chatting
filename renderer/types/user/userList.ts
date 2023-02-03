import { IUser } from "./user";

export interface IUserListProps {
  isOpen: boolean;
  isOpenFn: (boolean) => void;
}
export interface IUserListViewProps {
  resize: { width: number; height: number };
  name: string;
  users: IUser[];
  onClick: (user: IUser) => void;
}
