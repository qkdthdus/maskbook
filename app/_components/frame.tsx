import Image from "next/image";
import styled from "styled-components";

interface FrameProps {
    children: React.ReactNode;
}

export default function Frame({ children }: FrameProps) {
    return (
      <>
        <TopBar>
          <LogoContainer>
            <Logo>Mask</Logo>
            <LogoRow>
              <Image src="/mask.png" alt="top-panel" width={40} height={40} style={{ zIndex: -1000 }} />
              <Logo>Book</Logo>
            </LogoRow>
          </LogoContainer>
          <NavIsland>
            <NavItem>홈</NavItem>
            <NavItem>검색</NavItem>
            <NavItem>알림</NavItem>
            <NavItem>프로필</NavItem>
          </NavIsland>
          <LoginButton>
            <span>Login</span>
          </LoginButton>
        </TopBar>
        <Main>
          {children}
        </Main>
      </>
    );
  }


const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  grid-column: 1;
  padding-left: 2vw;
  margin-right: 4vw;
`;

const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: -0.5rem;
  position: relative;
`;

const Logo = styled.div`
  font-size: clamp(1.5rem, 2.25vw, 2.25rem);
  font-weight: bold;
  color: #1a1a1a;
  line-height: 1.2;
  position: relative;
  z-index: 2;
`;
const NavIsland = styled.div`
  background-color: #92BB8F;
  border-radius: clamp(12px, 1.5vw, 18px);
  width: clamp(300px, 80vw, 900px);
  padding: clamp(0.5rem, 1vw, 0.75rem) clamp(1.5rem, 4vw, 6rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  grid-column: 2;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e8e8e8;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const NavItem = styled.div`
  font-size: clamp(0.875rem, 1vw, 1rem);
  color: #333;
  cursor: pointer;
  transition: color 0.2s ease;
  padding: 0 clamp(0.25rem, 0.5vw, 0.5rem);

  &:hover {
    color: #000;
  }
`;

const LoginButton = styled.div`
  font-size: clamp(1rem, 1vw, 1rem);
  text-align: center;
  color: #333;
  cursor: pointer;
  transition: color 0.2s ease;
  background-color: #92bb8f;
  height: 45px;
  width: clamp(30px, 80vw, 90px);
  margin: 0 auto;
  border-radius: clamp(18px, 0.5vw, 18px);
  padding: 0 clamp(0rem, 0.5vw, 0.5rem);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #92bb8f79;
  }
`;

const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  box-sizing: content-box;
  z-index: 1000;
`;

const Main = styled.div`
  display: grid;
  grid-template-rows: 10fr 3fr;
  gap: 2rem;
  margin-top: 100px;
  margin: 4rem auto;
  padding-top: 100px;
`;


const TopPanel = styled.div`
  height: 100px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 clamp(100px, 15vw, 200px);
  padding-bottom: 20px;
  border-bottom: 2px solid #1a1a1a;
`;

const BoardTitle = styled.div`
  padding-top: 40px;

`;

const SearchBox = styled.div`
  display: flex;
  align-items: bottom;
  border: 2px solid black;
  border-radius: 18px;
  padding: 10px;
  margin-top: 20px;
  width: clamp(150px, 15vw, 20%);

  img:hover{
    cursor: pointer;
  }
`;

const SearchBoxRow = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 1rem;
  width: 100%;
`;
