import { IListProps } from "../common/common";
import { IEnterUser } from "./createdChatUser";

export interface IChatListProps extends IListProps {
  isOpen: boolean;
  setIsOpen: (boolean) => void;
  rooms: IRooms[];
  setRooms: (IRooms) => void;
  setIsRemove: (boolean) => void;
  height: number;
}

export interface IRooms {
  createdAt: number;
  enterUsers: IEnterUser[];
  email: string;
  id: string;
  name: string;
  owner: {
    id: string;
    name: string;
  };
  roomName: string;
}
