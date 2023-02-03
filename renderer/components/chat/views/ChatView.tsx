import styled from "styled-components";
import { IChatProps } from "../../../types/chat/chat";

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  .chatting {
    color: rgba(0, 0, 0, 0.5);
  }
`;
export default function ChatView({
  roomId,
  roomIdFn,
  roomName,
  messages,
}: IChatProps) {
  return (
    <li onClick={() => roomIdFn(roomId)}>
      <div className="avatar"></div>
      <TextBox>
        <span>{roomName}</span>
        <span className="chatting">
          {messages[messages.length - 1]?.message}
        </span>
      </TextBox>
    </li>
  );
}
