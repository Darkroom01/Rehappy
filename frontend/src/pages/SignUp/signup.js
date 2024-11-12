import { Reset } from "styled-reset";
import {Wrapper, Container, InputInformation, Input, Inputs, InputName, Right, Logo, SignupBtn} from './style'
import RehappyLogo from '../../images/리해피최종로고.png'

export default function Signup() {
    return(
        <>
            <Reset/>
            <Wrapper>
                <Container>
                    <InputInformation>
                        <Inputs>
                            <InputName>이름</InputName>
                            <Input></Input>
                        </Inputs>
                        <Inputs>
                            <InputName>아이디</InputName>
                            <Input></Input>
                        </Inputs>
                        <Inputs>
                            <InputName>비밀번호</InputName>
                            <Input></Input>
                        </Inputs>
                        <Inputs>
                            <InputName>비밀번호 확인</InputName>
                            <Input></Input>
                        </Inputs>
                    </InputInformation>
                    <Right>
                        <Logo src={RehappyLogo}/>
                        <SignupBtn>회원가입</SignupBtn>
                    </Right>
                </Container>
            </Wrapper>
        </>
    )
}
