import { Reset } from "styled-reset";
import {
    Container, Wrapper, Input,
    InputInformation, InputName, Inputs,
    Logo, Right, LoginBtn, Wrapper2,
    Title, AddProfileBtn, ProfileName, Profilediv, SaveProfileBtn
} from "./style";
import RehappyLogo from "../../images/리해피최종로고.png";
import {useEffect, useState} from "react";
import { ProfileContainer, ProfileImg, ProfileWrapper } from "../SignUp/style";
import {jwtDecode} from "jwt-decode";
import Profile from "../../images/img.png";
import axios from "axios";
import Cookies from "js-cookie";
import Man from "../../images/man.png";
import Woman from "../../images/woman.png";
import GrandF from "../../images/grandfather.png";
import GrandM from "../../images/granmother.png";

const profileTypes = [
    { type: 1, image: Profile },
    { type: 2, image: Man },
    { type: 3, image: Woman },
    { type: 4, image: GrandF },
    { type: 5, image: GrandM },
];

const profileImages = {
    1: Profile,
    2: Man,
    3: Woman,
    4: GrandF,
    5: GrandM,
};

export default function Login() {
    const [isNext, setIsNext] = useState(false);
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileType, setSelectedProfileType] = useState(null);
    const [profileName, setProfileName] = useState("");
    const [isAddingProfile, setIsAddingProfile] = useState(false);

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

    const handleFetchProfiles = async () => {
        const authToken = Cookies.get("authToken");
        if (!authToken) return;

        try {
            const response = await axios.get('http://localhost:8080/api/profiles/parent/users', {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            setProfiles(response.data); // 프로필 데이터를 상태에 저장
        } catch (error) {
            console.error("프로필 가져오기 실패:", error.response?.data || error.message);
            alert(`프로필 정보를 가져오는 데 실패했습니다.`);
        }
    };

    const handleAddProfile = () => {
        setIsAddingProfile(true);
    };

    const handleProfileSelection = (profileType) => {
        setSelectedProfileType(profileType);
        console.log(profileType)
    };

    // 프로필 저장 후 API에 전송
    const handleSaveProfile = async () => {
        if (!selectedProfileType || !profileName) {
            alert("프로필 타입과 닉네임을 입력해주세요.");
            return;
        }

        const authToken = Cookies.get("authToken");
        if (!authToken) {
            alert("로그인 후 프로필을 추가해주세요.");
            return;
        }

        // JWT 토큰에서 'name' 추출
        let userName = '';
        try {
            const decodedToken = jwtDecode(authToken);  // 토큰 디코딩
            userName = decodedToken.username;  // 'name'을 추출
        } catch (error) {
            console.error("토큰 디코딩 실패:", error);
            alert("토큰 디코딩 실패. 다시 로그인해주세요.");
            return;
        }

        // 서버로 POST 요청
        try {
            const response = await axios.post(
                'http://localhost:8080/api/profiles',
                {
                    profileName: profileName,
                    name: userName,            // 토큰에서 가져온 name
                    email: profileName,             // 사용자 아이디 (이메일로 사용)
                    password: password,        // 사용자 비밀번호
                    profilePictureType: selectedProfileType, // 선택된 프로필 타입
                },
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("프로필 저장 성공:", response.data);
            alert("프로필이 저장되었습니다.");
        } catch (error) {
            console.error("프로필 저장 실패:", error.response?.data || error.message);
            alert(`프로필 저장에 실패했습니다: ${error.response?.data?.message || "알 수 없는 오류"}`);
        }
    };

    useEffect(() => {
        if (isNext) {
            handleFetchProfiles();
        }
    }, [isNext]);


    return (
        <>
            <Reset />
            <Wrapper>
                {isNext ? (
                    <>
                        <Wrapper2>
                            <Title>기록할 프로필을 선택해 주세요</Title>
                            {isAddingProfile ? (
                                <div>
                                    <Title>프로필 선택 후 닉네임을 입력하세요</Title>
                                    <ProfileContainer>
                                        {profileTypes.map((profile) => (
                                            <ProfileWrapper key={profile.type} onClick={() => handleProfileSelection(profile.type)}>
                                                <ProfileImg src={profile.image} />
                                            </ProfileWrapper>
                                        ))}
                                    </ProfileContainer>
                                    {selectedProfileType && (
                                        <>
                                            <InputName>닉네임</InputName>
                                            <Input
                                                value={profileName}
                                                onChange={(e) => setProfileName(e.target.value)}
                                                placeholder="닉네임을 입력하세요"
                                            />
                                            <SaveProfileBtn onClick={handleSaveProfile}>저장</SaveProfileBtn>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <div style={{display:'flex', width:'auto', justifyContent:'space-around' }}>
                                        {profiles.map((profile) => (
                                            <Profilediv key={profile.id}>
                                                <ProfileWrapper>
                                                    <ProfileImg src={profileImages[profile.profilePictureType]} />
                                                </ProfileWrapper>
                                                <ProfileName>{profile.name}</ProfileName>
                                            </Profilediv>
                                        ))}
                                    </div>
                                    <AddProfileBtn onClick={handleAddProfile}>프로필 추가하기</AddProfileBtn>
                                </>
                            )}
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
