import styled from "styled-components";
import { IUser } from "../../../types/user/user";
import { IUserListViewProps } from "../../../types/user/userList";

const Wrapper = styled.div`
  padding: 20px;
  hr {
    border: none;
    height: 1px;
    background: rgba(0, 0, 0, 0.2);
  }
`;
const Title = styled.h3`
  font-size: 24px;
  font-weight: 700;
  padding: 10px 0px;
`;

const Users = styled.ul<{ height: number }>`
  max-height: ${(props) => props.height - 200 + "px"};
  overflow-y: auto;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .currentUser {
    position: sticky;
    top: 0;
    background-color: white;
    padding-bottom: 30px;
    &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      padding: 10px;
      width: 90%;
      border-bottom: solid 1px rgba(0, 0, 0, 0.2);
    }
  }
`;

const User = styled.li`
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  &:hover {
    background-color: rgba(137, 137, 137, 0.2);
  }

  .avatar {
    width: 50px;
    height: 50px;
    background-color: black;
    border-radius: 10px;
  }
`;

const ClickUserList = styled.ul`
  max-height: 100px;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  li {
    padding: 10px;
    border: solid 1px rgba(0, 0, 0, 0.5);
    border-radius: 30px;
    display: flex;
    gap: 10px;
  }
`;

const XIcon = styled.svg`
  width: 20px;
  height: 20px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
  .btn {
    padding: 10px 30px;
    border: solid 1px black;
    border-radius: 5px;
  }
  .enter {
    opacity: 0.5;
    background-color: rgb(228, 228, 228);
  }
  .cancle {
    background-color: white;
  }
  .acitve {
    opacity: 1;
    background-color: black;
    color: white;
  }
`;

export default function UserListView({
  resize,
  name,
  users,
  onClick,
}: IUserListViewProps) {
  return (
    <Wrapper>
      <Title>유저 목록</Title>

      <hr />
      <Users height={resize.height}>
        <User className="currentUser">
          <div className="avatar"></div>
          <div>{name}</div>
        </User>
        {users?.map((user: IUser) => (
          <User key={user.id} onClick={() => onClick(user)}>
            <div className="avatar"></div>
            <div>{user.name}</div>
          </User>
        ))}
      </Users>
    </Wrapper>
  );
}
