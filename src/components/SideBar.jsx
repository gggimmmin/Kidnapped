import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import colors from 'styles/theme';
import { IoSearch } from 'react-icons/io5';
import { FaBookmark } from 'react-icons/fa';
import Review from './Review';
import { useSearchParams } from 'react-router-dom';

const SideBar = ({ markers, setMarkers, mapPagination }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 지역 검색 함수
  const handleSearch = () => {
    if (!searchTerm) {
      alert('검색어를 입력하세요');
      return;
    }

    const searchMarkers = markers.filter((marker) => {
      return marker.roadAddress.includes(searchTerm) || marker.jibunAddress.includes(searchTerm);
      console.log(marker.roadAddress);
      // 오류 수정중
    });

    setMarkers(searchMarkers);
  };
  const buttonsNumber = [1, 2, 3];

  // 페이지 번호 클릭 핸들러
  const handlePageChange = (pageNumber) => {
    mapPagination.gotoPage(pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <StSideBar>
      <StContainer>
        <StSearchWrapper>
          <StSearchForm onSubmit={(e) => e.preventDefault()}>
            <input
              onSubmit="return false"
              type="text"
              placeholder="지역 검색"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            ></input>
            <StSearchButton onClick={handleSearch}>
              <IoSearch size={25} />
            </StSearchButton>
          </StSearchForm>
          <StBookmarkButton>
            <FaBookmark size={30} color={'white'} />
          </StBookmarkButton>
        </StSearchWrapper>
        <StMainCardWrapper>
          {markers.map((item) => {
            return (
              <StMainCardItem>
                <StMainCardInfoAndImage>
                  <StMainCardInfo>
                    <h1>{item.placeName}</h1>
                    <p>{item.roadAddress}</p>
                    <p>평점</p>
                  </StMainCardInfo>
                  <StImageWrapper>
                    <img
                      src="https://www.datanet.co.kr/news/photo/201706/111912_40939_1141.jpg"
                      alt="방탈출 카페 사진"
                    ></img>
                  </StImageWrapper>
                </StMainCardInfoAndImage>
              </StMainCardItem>
            );
          })}
        </StMainCardWrapper>
        <StButtonBox>
          {buttonsNumber.map((buttonNumber) => (
            <StPageButton
              index={buttonNumber}
              onClick={() => handlePageChange(buttonNumber)}
              $currentPage={currentPage}
            >
              {buttonNumber}
            </StPageButton>
          ))}
        </StButtonBox>
        {/* <Review /> 임시 주석처리  */}
      </StContainer>
    </StSideBar>
  );
};

export default SideBar;

export const StSideBar = styled.div`
  position: absolute;
  top: 68px;
  left: 0;
  width: 400px;
  height: 100vh;
  background-color: ${colors.subColor};
  z-index: 2;
`;

export const StContainer = styled.div`
  padding: 20px 16px;
  height: calc(100% - 40px);
`;

export const StSearchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  height: 47px;
  margin-bottom: 20px;
  flex: 1;
`;
export const StSearchForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background-color: white;
  border-radius: 100px;
  padding: 0 16px;
  flex: 1;

  & input {
    flex: 1;
    border: none;
    font-size: 20px;
    height: 100%;
    outline: none;
    background-color: transparent;
  }
`;

export const StSearchButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;
export const StBookmarkButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const StMainCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  /* max-height: calc(100vh - 68px - 47px); */
  height: 40rem;
`;

export const StMainCardItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 143px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: white;
`;

export const StMainCardInfoAndImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 16px;
  gap: 20px;
`;

export const StMainCardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  & h1 {
    font-weight: 700;
    font-size: 16px;
    color: ${colors.subColor};
  }
  & p {
    font-size: 12px;
    color: ${colors.mainTextColor};
  }
`;
export const StImageWrapper = styled.div`
  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const StButtonBox = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 20px;
`;

export const StPageButton = styled.button`
  background: ${colors.mainColor};
  color: white;
  border: none;
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;

  ${(props) => {
    if (props.$currentPage === props.index) {
      return css`
        background: ${colors.starColor};
      `;
    }
    return css`
      background: ${colors.mainColor};
    `;
  }}

  &:hover {
    background: ${colors.starColor};
  }
`;
