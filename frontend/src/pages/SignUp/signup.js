import { Reset } from "styled-reset";
import {
    Wrapper, Container, InputInformation, Input,
    Inputs, InputName, Right, Logo, SignupBtn,
    ProfileImg, ProfileWrapper, ProfileContainer, Title, Wrapper2
} from './style';
import RehappyLogo from '../../images/리해피최종로고.png';
import { useState } from 'react';
import axios from 'axios';
import Man from '../../images/man.png';
import Woman from '../../images/woman.png';
import GrandF from '../../images/grandfather.png';
import GrandM from '../../images/granmother.png';
import Profile from '../../images/img.png';

const profileTypes = [
    { type: 1, image: Profile },
    { type: 2, image: Man },
    { type: 3, image: Woman },
    { type: 4, image: GrandF },
    { type: 5, image: GrandM },
];

export default function Signup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNext, setIsNext] = useState(false);
    const [selectedProfileType, setSelectedProfileType] = useState(null);

    const handleNext = () => {
        setIsNext(true);
    };

    const handleProfileSelection = (profileType) => {
        setSelectedProfileType(profileType);
        console.log("선택된 프로필 타입:", profileType);
    };

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("name", name); // 사용자 이름
            formData.append("email", username); // 아이디 -> 이메일
            formData.append("password", password);


            // 쿼리 파라미터와 함께 POST 요청 전송
            const response = await axios.post('/api/users/register', formData, {
                headers: {
                    'Content-Type': ' application/json',
                },
                params: {
                    isDoctor: false,
                    profilePictureType: selectedProfileType
                },
            });

            console.log("회원가입 성공:", response.data);
            alert("회원가입이 완료되었습니다.");
        } catch (error) {
            console.error("회원가입 오류:", error.response?.data || error.message);
            alert(`회원가입에 실패했습니다: ${error.response?.data?.message || "알 수 없는 오류"}`);
        }
    };

    return (
        <>
            <Reset />
            <Wrapper>
                <Container>
                    {isNext ? (
                        <>
                            <Wrapper2>
                                <Title>기록할 프로필을 선택해 주세요</Title>
                                <ProfileContainer>
                                    {profileTypes.map((profile) => (
                                        <ProfileWrapper key={profile.type} onClick={() => handleProfileSelection(profile.type)}>
                                            <ProfileImg src={profile.image} />
                                        </ProfileWrapper>
                                    ))}
                                </ProfileContainer>
                                <SignupBtn onClick={handleSubmit}>완료</SignupBtn>
                            </Wrapper2>
                        </>
                    ) : (
                        <>
                            <InputInformation>
                                <Inputs>
                                    <InputName>이름</InputName>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} />
                                </Inputs>
                                <Inputs>
                                    <InputName>아이디</InputName>
                                    <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                                </Inputs>
                                <Inputs>
                                    <InputName>비밀번호</InputName>
                                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </Inputs>
                                <Inputs>
                                    <InputName>비밀번호 확인</InputName>
                                    <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                </Inputs>
                            </InputInformation>
                            <Right>
                                <Logo src={RehappyLogo} />
                                <SignupBtn onClick={handleNext}>다음</SignupBtn>
                            </Right>
                        </>
                    )}
                </Container>
            </Wrapper>
        </>
    );
}
