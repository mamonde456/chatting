export interface IMenuProps {
  setId?: (number) => void;
}
export interface IListProps extends IMenuProps {
  roomId?: string;
  setRoomId: (string) => void;
}
