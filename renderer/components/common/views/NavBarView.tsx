import Link from "next/link";
import styled from "styled-components";
import { INavBarViewProps } from "../../../types/common/common";

const Header = styled.header`
  width: 100%;
  height: 50px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  border-bottom: solid 1px rgba(0, 0, 0, 0.3);
  nav {
    display: flex;
    gap: 30px;
    span {
      cursor: pointer;
    }
  }
`;

export default function NavBarView({ isLoggedIn, onLogout }: INavBarViewProps) {
  return (
    <Header>
      <nav>
        <Link href="/">home</Link>
        {isLoggedIn ? (
          <span onClick={onLogout}>logout</span>
        ) : (
          <Link href="/login">login</Link>
        )}
      </nav>
    </Header>
  );
}
