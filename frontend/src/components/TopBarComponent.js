import React from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Container=styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1500px;
  height: 100px;
  //background-color: gray;
`;

const LogoWrapper = styled.div`
    width: 230px;
    height: 90px;
    display: flex;
    justify-content: center; 
    //background-color: #61dafb;
    margin: 30px 0 0 100px;
`;

const Logo = styled.div`
    background-image: url("/images/logo.png");
    background-size: cover;
    background-position: center;
    width: 100%;
    height: auto;
  margin-bottom: 1.5em;
  cursor: pointer;
 // background-color: pink;
    
`;

const MenuContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
   // background-color: yellowgreen;
    margin-left: 20%;
`;

const Community = styled.button`
  background-color: transparent;
  border: none;
  font-weight: bolder;
  font-size: 17px;
  cursor: pointer;
    z-index: 3;
    
`;

const MyPage = styled.button`
  background-color: transparent;
  border: none;
  font-weight: bolder;
  font-size: 14px;
  cursor: pointer;
    z-index: 3;
`;


export default function TopBarComponent({ fontColor }) {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoCommunity = () => {
        // navigate('/review');
        alert('만든 페이지 주소 연결해야됨\ncomponents/TopBarComponent.js 파일의 handleGoCommunity 함수')
    };

    const handleGoFindHospital = () => {
        navigate('/findHospital');
    };

    const handleGoMyPage = () => {
        // navigate('/my');
        alert('만든 페이지 주소 연결해야됨\ncomponents/TopBarComponent.js 파일의 handleGoMyPage 함수')
    };

    const handleGoManagement = () =>{
        // navigate('/Management');
        alert('만든 페이지 주소 연결해야됨\ncomponents/TopBarComponent.js 파일의 handleGoManagement 함수')
    };

    return (
        <Container>
            <TopBar>
                <LogoWrapper>
                    <Logo onClick={handleGoHome}></Logo>
                </LogoWrapper>
                <MenuContainer style={{color:fontColor}}>
                    <Community style={{color:fontColor}} onClick={handleGoCommunity}>커뮤니티</Community>
                    <Community style={{color:fontColor}} onClick={handleGoFindHospital}>주변 병원 탐색하기</Community>
                    <Community style={{color:fontColor}} onClick={handleGoManagement}>내 통증 관리</Community>
                    <MyPage style={{color: fontColor}} onClick={handleGoMyPage}>
                        <svg width="50" height="50" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                             xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="25" height="25" rx="12.5" fill="#FFF1A9"/>
                            <rect x="2" width="21" height="25" fill="url(#pattern0_9_271)"/>
                            <defs>
                                <pattern id="pattern0_9_271" patternContentUnits="objectBoundingBox" width="1"
                                         height="1">
                                    <use xlinkHref="#image0_9_271"
                                         transform="matrix(0.00232515 0 0 0.00195312 -0.0952381 0)"/>
                                </pattern>
                                <image id="image0_9_271" width="512" height="512"
                                       xlinkHref="data:image/png;base64,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"/>
                            </defs>
                        </svg>
                    </MyPage>
                </MenuContainer>
            </TopBar>
        </Container>
    );
}
