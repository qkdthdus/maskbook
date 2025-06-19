'use client'

import { Post } from "@/lib/generated/prisma";
import Image from "next/image";
import styled from "styled-components";
import useSWR from "swr";
import { formatDate } from "@/lib/utils";
import { Spinner } from "@/app/_components/loading-spinner";
import { useParams } from "next/navigation";
import Frame from "@/app/_components/frame";

interface PostResponse {
  ok: boolean;
  post: Post;
}

export default function PostPage() {
  const params = useParams();
  const id = Number(params.id);
  const {data, error, isLoading} = useSWR<PostResponse>(`/api/post/${id}`);
  console.log('Post data:', data); // 데이터 확인용 로그

  return (
    <Frame>
      <TopPanel>
        <TopRow>
          <BoardTitle>
            <span style={{ fontSize: '1.7rem', fontWeight: 'bold', color: 'darkgrey' }}>Category</span>
          </BoardTitle>
          <SearchBox>
            <SearchBoxRow>
              <Image src="/search.png" alt="search" width={20} height={20} />
              <SearchInput type="text" placeholder="Search" />
            </SearchBoxRow>
          </SearchBox>
        </TopRow>
        <SBoard>
          {isLoading && (
            <SpinnerWrapper>
              <Spinner size="40px" color="#92BB8F" />
            </SpinnerWrapper>
          )}
          {!isLoading && !error && data?.post && (
            <>
              <PostTitleRow>
                <PostTitleLabel>Title</PostTitleLabel>
                <PostTitleContent>{data.post.title}</PostTitleContent>
              </PostTitleRow>
              <PostMetaRow>
                <span>id</span>
                <span>date</span>
                <span>likes</span>
              </PostMetaRow>
              <PostContentRow>
                {data.post.content || '내용이 없습니다.'}
              </PostContentRow>
            </>
          )}
        </SBoard>
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
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.8);
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
  margin-left: 10px;
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

const SBoard = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0 clamp(120px, 15vw, 200px);
`;

const PostTitleRow = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #222;
  padding: 0.7rem 0 0.7rem 15px;
`;

const PostTitleLabel = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
  margin-right: 1.5rem;
`;

const PostTitleContent = styled.span`
  font-size: 1.1rem;
`;

const PostMetaRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 3rem;
  border-bottom: 1px solid #222;
  padding: 0.7rem 0 0.7rem 15px;
  color: #444;
  font-size: 1rem;
`;

const PostContentRow = styled.div`
  min-height: 200px;
  padding: 1.5rem 0;
  padding-left: 15px;
  border-bottom: 1px dotted #888;
  font-size: 1.1rem;
  color: #222;
  white-space: pre-wrap;
`;