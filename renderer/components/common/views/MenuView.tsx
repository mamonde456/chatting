import styled from "styled-components";
import { IMenuViewProps } from "../../../types/common/common";

const ListBox = styled.div<{ height: number }>`
  padding-top: 50px;
  width: 100px;
  height: ${(props) => props.height - 50}px;
  background-color: #d8deeb;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  li {
    width: 100%;
    padding: 10px;
  }
`;

export default function MenuView({ listArray, height, setId }: IMenuViewProps) {
  return (
    <ListBox height={height}>
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
