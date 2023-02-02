import { useRouter } from "next/router";
import styled from "styled-components";
import { IMenuProps } from "../../types/common";
import { listArray } from "../../until/menu";
import ChatList from "../chat/ChatList";
import UserList from "../user/UserList";

const ListBox = styled.div`
  /* position: fixed; */
  /* left: 0; */
  padding-top: 50px;
  width: 100px;
  height: 100vh;
  background-color: #d8deeb;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  li {
    width: 100%;
    padding: 10px;
    /* border: solid 1px black; */
  }
`;

export default function Menu({ setId }: IMenuProps) {
  const router = useRouter();
  return (
    <ListBox>
      <List>
        {listArray.map((item) => (
          <li key={item.id} onClick={() => setId(item.id)}>
            {item.list}
          </li>
        ))}
      </List>
    </ListBox>
  );
}
