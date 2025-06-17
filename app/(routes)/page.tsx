'use client'

import { Post } from "@/lib/generated/prisma";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import { formatDate } from "@/lib/utils";
import { Spinner } from "../_components/loading-spinner";
import Frame from "../_components/frame";

interface PostResponse {
  ok:boolean;
  postList: Post[];
}

export default function Home() {
  const {data, error, isLoading} = useSWR<PostResponse>('/api/post');
  //console.log(data);

  return (
    <Frame>
      <TopPanel>
        <TopRow>
          <BoardTitle>
            <span style={{ fontSize: '1.7rem', fontWeight: 'bold' }}>Board</span>
          </BoardTitle>
          <SearchBox>
            <SearchBoxRow>
              <Image src="/search.png" alt="search" width={20} height={20} />
              <SearchInput type="text" placeholder="Search" />
            </SearchBoxRow>
          </SearchBox>
        </TopRow>
        <Board>
          {isLoading && (
            <SpinnerWrapper>
              <Spinner size="40px" color="#92BB8F" />
            </SpinnerWrapper>
          )}
          {!isLoading && !error && data?.postList.map(({ id, title, createdAt, likedCount }) => (
            <SLink href={`/post/${id}`} key={id}>
              <ListRow>
                <span>{title}</span>
                <span>{id}</span>
                <span>{formatDate(createdAt)}</span>
                <span>{likedCount}</span>
              </ListRow>
            </SLink>
          ))}
        </Board>
      </TopPanel>
    </Frame>
  );
}

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
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
  margin-left: 20px;
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

const Board = styled.div`
  display: flex;
  margin: 0 clamp(100px, 15vw, 200px);
  flex-direction: column;
`;

const SLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const ListRow = styled.div`
  &:hover{
    cursor: pointer;
  }

  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  gap: 1rem;
  margin-left: 20px;

  span {
    &:nth-child(1) { // 제목
      width: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:nth-child(2) { // ID
      width: 15%;
      text-align: center;
    }
    &:nth-child(3) { // 날짜
      width: 20%;
      text-align: center;
    }
    &:nth-child(4) { // 좋아요 수
      width: 15%;
      text-align: center;
    }
  }
`;
