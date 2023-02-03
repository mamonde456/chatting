import styled from "styled-components";
import { ICreateChatUserViewProps } from "../../../types/chat/chat";
import { IUser } from "../../../types/user/user";

const Wrapper = styled.div`
  width: 100%;
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

const Users = styled.ul`
  max-height: 400px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
  li {
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

export default function CreateChatUsersView({
  clickUsers,
  users,
  isActive,
  createdRoom,
  isOpenFn,
  setClickUsers,
  userRemove,
  onClick,
}: ICreateChatUserViewProps) {
  return (
    <Wrapper>
      <Title>대화 상대 선택</Title>
      <ClickUserList>
        {clickUsers.map((user: IUser) => (
          <li key={user.id}>
            <span>{user.name}</span>
            <XIcon
              onClick={() => userRemove(user)}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
            </XIcon>
          </li>
        ))}
      </ClickUserList>
      <hr />
      <Users>
        {users?.map((user) => (
          <li key={user.id} onClick={() => onClick(user)}>
            <div className="avatar"></div>
            <div>{user.name}</div>
          </li>
        ))}
      </Users>
      <BtnBox>
        <button
          className={isActive ? "btn enter acitve" : "btn enter"}
          disabled={!isActive}
          onClick={createdRoom}
        >
          확인
        </button>
        <button
          className="btn cancle"
          onClick={() => {
            isOpenFn((prev) => !prev);
            setClickUsers([]);
          }}
        >
          취소
        </button>
      </BtnBox>
    </Wrapper>
  );
}
