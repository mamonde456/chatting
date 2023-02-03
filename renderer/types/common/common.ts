export interface IMenuProps {
  setId?: (number) => void;
  height?: number;
}
export interface IListProps extends IMenuProps {
  roomId?: string;
  setRoomId: (string) => void;
}

export interface INavBarViewProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export interface IMenuViewProps extends IMenuProps {
  listArray: IlistArray[];
}

interface IlistArray {
  id: number;
  list: string;
}
