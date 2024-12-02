import { Reset } from "styled-reset";
import {
    Container, Wrapper, Input,
    InputInformation, InputName, Inputs,
    Logo, Right, LoginBtn, Wrapper2,
    Title, AddProfileBtn, ProfileName, Profilediv, SaveProfileBtn, Input2
} from "./style";
import RehappyLogo from "../../images/리해피최종로고.png";
import { useEffect, useState } from "react";
import { ProfileContainer, ProfileImg, ProfileWrapper } from "../SignUp/style";
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const [isNext, setIsNext] = useState(false);
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [profiles, setProfiles] = useState([]);
    const [selectedProfileType, setSelectedProfileType] = useState(null);
    const [profileName, setProfileName] = useState("");
    const [isAddingProfile, setIsAddingProfile] = useState(false);
    const [isLoadingProfiles, setIsLoadingProfiles] = useState(false);

    const handleNext = async () => {
        try {
            const response = await axios.post(`/api/users/login`, null, {
                params: {
                    email: userId,
                    password: password,
                },
            });

            const token = response.data;
            if (token) {
                Cookies.set("authToken", token, {
                    expires: 7,
                    secure: true,
                    sameSite: "strict",
                });
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

        setIsLoadingProfiles(true);
        try {
            const response = await axios.get('http://localhost:8080/api/profiles/parent/users', {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            setProfiles(response.data);
        } catch (error) {
            console.error("프로필 가져오기 실패:", error.response?.data || error.message);
            alert(`프로필 정보를 가져오는 데 실패했습니다.`);
        } finally {
            setIsLoadingProfiles(false);
        }
    };

    const handleAddProfile = () => {
        setIsAddingProfile(true);
    };

    const handleProfileClick = async (profileId) => {
        const authToken = Cookies.get("authToken");
        if (!authToken) {
            alert("로그인 후 프로필을 선택해주세요.");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8080/api/profiles/select?profileId=${profileId}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                        'Accept': '*/*',
                    },
                }
            );

            const newToken = response.data.token;
            console.log("프로필선택후 발급된 토큰:", newToken);

            if (newToken) {
                Cookies.set("authToken", newToken, {
                    expires: 7,
                    secure: false   ,
                    sameSite: "strict",
                });
                alert("프로필 선택이 완료되었습니다!");
                navigate("/");
            } else {
                throw new Error("토큰 발급 실패.");
            }
        } catch (error) {
            console.error("프로필 선택 실패:", error.response?.data || error.message);
            alert(`프로필 선택에 실패했습니다: ${error.response?.data?.message || "알 수 없는 오류"}`);
        }
    };

    useEffect(() => {
        if (isNext) {
            handleFetchProfiles();
        }
    }, [isNext]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleNext();
        }
    };

    return (
        <>
            <Reset />
            <Wrapper>
                {isNext ? (
                    <Wrapper2>
                        {isAddingProfile ? (
                            <div style={{height:'80%', width:'90%'}}>
                                <Title>프로필 선택 후 닉네임을 입력하세요</Title>
                                <ProfileContainer>
                                    {profileTypes.map((profile) => (
                                        <ProfileWrapper
                                            key={profile.type}
                                            isSelected={selectedProfileType === profile.type}
                                            onClick={() => setSelectedProfileType(profile.type)}
                                        >
                                            <ProfileImg src={profile.image} />
                                        </ProfileWrapper>
                                    ))}
                                </ProfileContainer>
                                {selectedProfileType && (
                                    <div>
                                        <InputName>닉네임</InputName>
                                        <div style={{display:'flex', width:'100%',  justifyContent:'space-between', alignItems:'center'}}>
                                            <Input2
                                                value={profileName}
                                                onChange={(e) => setProfileName(e.target.value)}
                                                placeholder="닉네임을 입력하세요"
                                            />
                                            <SaveProfileBtn onClick={() => alert("프로필 추가 로직 구현!")}>저장</SaveProfileBtn>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                {isLoadingProfiles ? (
                                    <p>프로필을 불러오는 중입니다...</p>
                                ) : (
                                    <>
                                        <Title>기록할 프로필을 선택해 주세요</Title>
                                        <div style={{ display: 'flex', width: 'auto', justifyContent: 'space-around'}}>
                                            {profiles.map((profile) => (
                                                <Profilediv key={profile.id}>
                                                    <ProfileWrapper onClick={() => handleProfileClick(profile.id)}>
                                                        <ProfileImg src={profileImages[profile.profilePictureType]} />
                                                    </ProfileWrapper>
                                                    <ProfileName>{profile.name}</ProfileName>
                                                </Profilediv>
                                            ))}
                                        </div>
                                    </>
                                )}
                                <AddProfileBtn onClick={handleAddProfile}>프로필 추가하기</AddProfileBtn>
                            </>
                        )}
                    </Wrapper2>
                ) : (
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
                                    onKeyPress={handleKeyPress}
                                />
                            </Inputs>
                            <Inputs>
                                <InputName>비밀번호</InputName>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                            </Inputs>
                            <LoginBtn onClick={handleNext}>로그인</LoginBtn>
                        </InputInformation>
                    </Container>
                )}
            </Wrapper>
        </>
    );
}
