export interface IChatProps {
  roomName: string;
  roomId: string;
  roomIdFn: (string) => void;
  messages?: IMessage[];
}

export interface IMessage {
  createdAt: string;
  id: string;
  message: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
}
