export interface IChatProps {
  roomName: string;
  roomId: string;
  roomIdFn: (string) => void;
}
export interface ICreateChatUserProps {
  isOpenFn: (boolean) => void;
}
