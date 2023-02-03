import { IMenuProps, IMenuViewProps } from "../../types/common/common";
import MenuView from "./views/MenuView";

export default function Menu({ setId, height }: IMenuProps) {
  const listArray = [
    {
      id: 0,
      list: "유저 목록",
    },
    {
      id: 1,
      list: "채팅방",
    },
  ];

  const MenuViewProps: IMenuViewProps = {
    listArray,
    height,
    setId,
  };

  return <MenuView {...MenuViewProps} />;
}
