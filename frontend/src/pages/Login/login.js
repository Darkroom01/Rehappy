import { Reset } from "styled-reset";
import {
    Container,
    Wrapper,
    Input,
    InputInformation,
    InputName,
    Inputs,
    Logo,
    Right,
    LoginBtn,
    Wrapper2,
    Title, AddProfileBtn, ProfileName, Profilediv
} from "./style";
import RehappyLogo from "../../images/리해피최종로고.png";
import { useState } from "react";
import { ProfileContainer, ProfileImg, ProfileWrapper } from "../SignUp/style";
import Profile from "../../images/img.png";
import axios from "axios";
import Cookies from "js-cookie"; // 쿠키 관리를 위한 js-cookie 라이브러리

export default function Login() {
    const [isNext, setIsNext] = useState(false);
    const [userId, setUserId] = useState(""); // 아이디 입력 상태
    const [password, setPassword] = useState(""); // 비밀번호 입력 상태

    const handleNext = async () => {
        try {
            const response = await axios.post(`/api/users/login`, null, {
                params: {
                    email: userId,
                    password: password,
                },
            });

            console.log("서버 응답 데이터:", response.data);  // 전체 응답 데이터 확인
            const token = response.data;  // 응답 데이터가 토큰 자체일 수 있음

            if (token) {
                Cookies.set("authToken", token, {
                    expires: 7,
                    secure: true,
                    sameSite: "strict",
                });
                console.log("JWT 저장 성공:", token);
                alert("로그인 성공!");
                setIsNext(true);
            } else {
                throw new Error("토큰이 존재하지 않습니다.");
            }
        } catch (error) {
            console.error("로그인 실패:", error.response?.data || error.message);
            alert(`로그인에 실패했습니다: ${error.response?.data?.message || "알 수 없는 오류"}`);
        }

    };

    return (
        <>
            <Reset />
            <Wrapper>
                {isNext ? (
                    <>
                        <Wrapper2>
                            <Title>기록할 프로필을 선택해 주세요</Title>
                            <ProfileContainer>
                                <Profilediv>
                                    <ProfileWrapper>
                                        <ProfileImg src={Profile} />
                                    </ProfileWrapper>
                                    <ProfileName>김땡땡</ProfileName>
                                </Profilediv>
                                <Profilediv>
                                    <ProfileWrapper>
                                        <ProfileImg src={Profile} />
                                    </ProfileWrapper>
                                    <ProfileName>김땡땡</ProfileName>
                                </Profilediv>
                                <Profilediv>
                                    <ProfileWrapper>
                                        <ProfileImg src={Profile} />
                                    </ProfileWrapper>
                                    <ProfileName>김땡땡</ProfileName>
                                </Profilediv>
                                <Profilediv>
                                    <ProfileWrapper>
                                        <ProfileImg src={Profile} />
                                    </ProfileWrapper>
                                    <ProfileName>김땡땡</ProfileName>
                                </Profilediv>
                                <Profilediv>
                                    <ProfileWrapper>
                                        <ProfileImg src={Profile} />
                                    </ProfileWrapper>
                                    <ProfileName>김땡땡</ProfileName>
                                </Profilediv>
                            </ProfileContainer>
                            <AddProfileBtn>프로필 추가하기</AddProfileBtn>
                        </Wrapper2>
                    </>
                ) : (
                    <>
                        <Container>
                            <Right>
                                <Logo src={RehappyLogo} />
                            </Right>
                            <InputInformation>
                                <Inputs>
                                    <InputName>아이디</InputName>
                                    <Input
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                    />
                                </Inputs>
                                <Inputs>
                                    <InputName>비밀번호</InputName>
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Inputs>
                                <LoginBtn onClick={handleNext}>로그인</LoginBtn>
                            </InputInformation>
                        </Container>
                    </>
                )}
            </Wrapper>
        </>
    );
}
