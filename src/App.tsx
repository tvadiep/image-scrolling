import React, { useEffect, useState } from "react";
import "./App.css";
import { fetchNews } from "./api/api";
import styled from "styled-components";
import { fakeInfo } from "./fakeData";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ProfileListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  height: 80%;
`;

const ProfileContainer = styled.div`
  border: 1px solid black;
`;

const NewsBlock: React.FC = () => {
  console.log("Loading News");
  return (
    <div>
      <h3>Title</h3>
      <p>Description</p>
    </div>
  );
};

interface PageContainerProps {
  onActive?: boolean;
}
const PageContainer = styled.div<PageContainerProps>`
  border: 1px solid black;
  padding: 5px;
  display: inline-block;
  cursor: pointer;
  background-color: ${(props) => (props.onActive ? "black" : "white")};
  color: ${(props) => (props.onActive ? "white" : "black")};
`;

type NavigationBarProps = {
  pageNumber: number;
  currentPage: number;
  setCurrentPage: any;
};

const NavigationBar: React.FC<NavigationBarProps> = ({
  pageNumber,
  currentPage,
  setCurrentPage,
}) => {
  const pages = [];
  for (let page = 1; page <= pageNumber; page++) {
    pages.push(page);
  }
  return (
    <div>
      {pages.map((page) => (
        <PageContainer
          onClick={() => {
            setCurrentPage(page);
          }}
          key={page}
          onActive={page === currentPage}
        >
          {page}
        </PageContainer>
      ))}
    </div>
  );
};

function App() {
  const [profiles, setProfiles] = useState<object[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumber = Math.ceil(fakeInfo.length / 12);
  const showedProfiles = profiles?.slice(
    (currentPage - 1) * 12,
    currentPage * 12
  );
  useEffect(() => {
    setProfiles(fetchNews());
  });
  return (
    <Container>
      <ProfileListContainer className="App">
        {showedProfiles?.map((profile: any, index: any) => (
          <ProfileContainer>
            <h1>Name: {profile.name}</h1>
            <p>Age: {profile.age}</p>
          </ProfileContainer>
        ))}
      </ProfileListContainer>
      <NavigationBar
        pageNumber={pageNumber}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Container>
  );
}

export default App;
