import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import Profile from "../images/img.png";
import Man from "../images/man.png";
import Woman from "../images/woman.png";
import GrandF from "../images/grandfather.png";
import GrandM from "../images/granmother.png";

const profileTypes = {
    1: Profile,
    2: Man,
    3: Woman,
    4: GrandF,
    5: GrandM,
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 1500px;
    height: 100px;
`;

const LogoWrapper = styled.div`
    width: 230px;
    height: 90px;
    display: flex;
    justify-content: center;
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
`;

const MenuContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 20%;
`;

const Community = styled.button`
    background-color: transparent;
    border: none;
    font-weight: bolder;
    font-size: 17px;
    cursor: pointer;
`;
const ImgWrapper=styled.div`
    width: 40px;
    height: 40px;
    background-color: #FFF1A9;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    
`
const MyPageImage = styled.img`
    width: 35px;
    height: 35px;
    cursor: pointer;
    padding: 10px;
    transition: background-color 0.3s ease;
`;

const LogoutText = styled.div`
    display: none; /* 기본적으로 숨김 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    cursor: pointer;
`;

const LoginButton = styled.button`
    background-color: #110078;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    padding: 8px 16px;
    cursor: pointer;
`;

const ProfileWrapper = styled.div`
    position: relative;
    display: inline-block;

    &:hover ${ImgWrapper} {
        background-color: black;
    }

    &:hover ${LogoutText} {
        display: flex;
    }
`;


export default function TopBarComponent({ fontColor }) {
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(null); // 사용자 프로필 이미지
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 확인
    const [isHover, setIsHover] = useState(false); // 호버 상태


    useEffect(() => {
        const authToken = Cookies.get("authToken");
        if (authToken) {
            try {
                const decoded = jwtDecode(authToken);
                const profileType = decoded.profileType;
                setProfileImage(profileTypes[profileType] || Profile); // 매칭된 이미지 설정
                setIsLoggedIn(true); // 로그인 상태로 변경
            } catch (error) {
                console.error("JWT 디코딩 오류:", error);
                setIsLoggedIn(false); // 디코딩 실패 시 비로그인 상태로 처리
            }
        } else {
            setIsLoggedIn(false); // 쿠키 없으면 비로그인 상태
        }
    }, []);

    const handleLogout = () => {
        // 쿠키 삭제
        Cookies.remove('authToken');
        setIsLoggedIn(false); // 상태 업데이트
        alert('로그아웃 되었습니다.');
    };


    const handleGoHome = () => navigate('/');
    const handleGoCommunity = () => navigate('/community');
    const handleGoFindHospital = () => navigate('/findHospital');
    const handleGoManagement = () => navigate('/list');

    return (
        <Container>
            <TopBar>
                <LogoWrapper>
                    <Logo onClick={handleGoHome}></Logo>
                </LogoWrapper>
                <MenuContainer style={{ color: fontColor }}>
                    <Community style={{ color: fontColor }} onClick={handleGoCommunity}>
                        커뮤니티
                    </Community>
                    <Community style={{ color: fontColor }} onClick={handleGoFindHospital}>
                        주변 병원 탐색하기
                    </Community>
                    <Community style={{ color: fontColor }} onClick={handleGoManagement}>
                        내 통증 관리
                    </Community>
                    {isLoggedIn ? (
                        <ProfileWrapper onClick={handleLogout}>
                            <ImgWrapper
                                onMouseEnter={() => setIsHover(true)}
                                onMouseLeave={() => setIsHover(false)}
                            >
                                <MyPageImage
                                    src={profileImage}
                                    alt="My Profile"
                                />
                            </ImgWrapper>
                            <LogoutText isHover={isHover}>로그아웃</LogoutText>
                        </ProfileWrapper>
                    ) : (
                        <LoginButton onClick={() => navigate('/login')}>로그인</LoginButton>
                    )}
                </MenuContainer>
            </TopBar>
        </Container>
    );
}
