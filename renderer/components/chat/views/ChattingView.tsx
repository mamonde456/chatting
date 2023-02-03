import styled from "styled-components";
import { IChattingViewProps } from "../../../types/chat/chatting";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const MsgList = styled.ul`
  width: 100%;
  height: 75vh;
  padding: 50px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;
const Li = styled.li<{ flex: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  align-self: ${(props) => (props.flex ? "flex-end" : "flex-start")};

  .name {
    margin-bottom: 10px;
  }
`;

const MessageBox = styled.div`
  .message {
    border-radius: 8px;
    max-width: 250px;
    padding: 10px;
    background-color: #cdcdcd;
    position: relative;
  }
  .meArrow {
    &::before {
      content: "";
      position: absolute;
      right: -18px;
      top: 8px;
      width: 0;
      height: 0;
      border-bottom: 8px solid transparent;
      border-top: 8px solid transparent;
      border-left: 10px solid #cdcdcd;
      border-right: 10px solid transparent;
    }
  }
  .youArrow {
    &::before {
      content: "";
      position: absolute;
      left: -18px;
      top: 8px;
      width: 0;
      height: 0;
      border-bottom: 8px solid transparent;
      border-top: 8px solid transparent;
      border-left: 10px solid transparent;
      border-right: 10px solid #cdcdcd;
    }
  }
`;

const Form = styled.form`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: white;
  padding: 10px;
  input {
    text-indent: 10px;
    font-size: 18px;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  button {
    border: solid 1px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    height: 100%;
  }
`;

const DeleteIcon = styled.svg`
  padding: 10px;
  width: 50px;
  height: 50px;
`;

const HeaderBox = styled.div`
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 0px 50px;
  position: sticky;
  top: 0;
`;

export default function ChattingView({
  onDelete,
  scrollRef,
  messages,
  user,
  onChange,
  message,
  onSubmit,
}: IChattingViewProps) {
  return (
    <Wrapper>
      <HeaderBox>
        <DeleteIcon
          onClick={onDelete}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L512.9 376.7C552.2 340.2 576 292.3 576 240C576 125.1 461.4 32 320 32c-67.7 0-129.3 21.4-175.1 56.3L38.8 5.1zM64 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9c-5.5 9.2-11.1 16.6-15.2 21.6c-2.1 2.5-3.7 4.4-4.9 5.7c-.6 .6-1 1.1-1.3 1.4l-.3 .3 0 0 0 0 0 0 0 0c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c28.7 0 57.6-8.9 81.6-19.3c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c37 0 72.3-6.4 104-17.9L82.9 161.3C70.7 185.6 64 212.2 64 240z" />
        </DeleteIcon>
      </HeaderBox>
      <MsgList ref={scrollRef}>
        {messages?.map((el) => (
          <Li key={el.createdAt} flex={el.owner.email === user.email}>
            <span className="name">
              {el.owner.email === user.email ? user.name : el.owner.name}
            </span>
            <MessageBox>
              <span
                className={
                  el.owner.email === user.email
                    ? "message meArrow"
                    : "message youArrow"
                }
              >
                {el.message}
              </span>
            </MessageBox>
          </Li>
        ))}
      </MsgList>

      <Form>
        <input type="text" name="message" onChange={onChange} value={message} />
        <button type="submit" onClick={onSubmit}>
          send
        </button>
      </Form>
    </Wrapper>
  );
}
