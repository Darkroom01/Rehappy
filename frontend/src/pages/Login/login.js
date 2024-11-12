import { Reset } from "styled-reset";
import {Container, Wrapper, Input, InputInformation, InputName, Inputs, Logo, Right, LoginBtn} from "./style";
import RehappyLogo from "../../images/리해피최종로고.png";

export default function Signup() {
    return(
        <>
            <Reset/>
            <Wrapper>
                <Container>
                    <Right>
                        <Logo src={RehappyLogo}/>
                    </Right>
                    <InputInformation>
                        <Inputs>
                            <InputName>아아디</InputName>
                            <Input></Input>
                        </Inputs>
                        <Inputs>
                            <InputName>비밀번호</InputName>
                            <Input></Input>
                        </Inputs>
                        <LoginBtn>로그인</LoginBtn>
                    </InputInformation>
                </Container>
            </Wrapper>
        </>
    )
}
