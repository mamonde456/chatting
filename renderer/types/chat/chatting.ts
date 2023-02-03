import { RefObject } from "react";
import { IMessage } from "./chat";

export interface IChattingProps {
  roomId: string;
  setRoomId: (string) => void;
  setIsRemove: (boolean) => void;
}

export interface IChattingViewProps {
  onDelete: () => void;
  scrollRef: RefObject<HTMLUListElement | null>;
  messages: IMessage[];
  user: {
    name: string;
    id: string;
    email: string;
  };
  message: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}
