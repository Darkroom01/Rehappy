import { Reset } from "styled-reset";
import {
    Wrapper,
    Container,
    InputInformation,
    Input,
    Inputs,
    InputName,
    Right,
    Logo,
    SignupBtn,
    ProfileImg, ProfileWrapper, ProfileContainer
} from './style';
import RehappyLogo from '../../images/리해피최종로고.png';
import { useState } from 'react';
import Man from '../../images/man.png'
import Woman from '../../images/woman.png'
import GrandF from '../../images/grandfather.png'
import GrandM from '../../images/granmother.png'
import Profile from '../../images/img.png'

export default function Signup() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNext, setIsNext] = useState(false); // New state to track if content should change

    const handleSignup = async () => {
        setIsNext(true);

    };

    return (
        <>
            <Reset />
            <Wrapper>
                <Container>
                    {isNext ? (
                        <>

                            <ProfileContainer>
                                <ProfileWrapper>
                                    <ProfileImg src={Profile}/>
                                </ProfileWrapper>
                                <ProfileWrapper>
                                    <ProfileImg src={Man}/>
                                </ProfileWrapper>
                                <ProfileWrapper>
                                    <ProfileImg src={Woman}/>
                                </ProfileWrapper>
                                <ProfileWrapper>
                                    <ProfileImg src={GrandF}/>
                                </ProfileWrapper>
                                <ProfileWrapper>
                                    <ProfileImg src={GrandM}/>
                                </ProfileWrapper>
                            </ProfileContainer>
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
                                <SignupBtn onClick={handleSignup}>다음</SignupBtn>
                            </Right>
                        </>
                    )}
                </Container>
            </Wrapper>
        </>
    );
}
