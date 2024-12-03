import styled from "styled-components";

export const Wrapper=styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Container=styled.div`
    width: 800px;
    height: 400px;
    border-radius: 12px;
    border: 3px solid #110078;
    display: flex;
`

export const InputInformation =styled.div`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background-color: #D7E8FF;
    border-radius: 12px 0 0 12px;
`
export const Inputs =styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 40px;
`
export const InputName =styled.div`
    font-family: NanumGothic;
    margin-bottom: 5px;
`
export const Input=styled.input`
    width: 80%;
    height: 25px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;

`
export const Right=styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;

`
export const Logo=styled.img`
    width: 250px;
    margin-top: 40px;
   
`
export const SignupBtn=styled.button`
    background-color: #110078;
    height: 45px;
    width: 150px;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    color: white;
    margin-top: -20px;
    font-family: NanumGothic;
`
export const ProfileWrapper = styled.div`
    width: 60px;
    height: 60px;
    padding: 30px;
    background-color: ${({ isSelected }) => (isSelected ? "#FFAE00" : "#D7E8FF")}; /* 선택 여부에 따라 색상 변경 */
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: ${({ isSelected }) => (isSelected ? "#FFAE00" : "#B0D4FF")}; /* 선택된 경우 hover 색상 유지 */
    }
`;

export const ProfileImg = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;
export const ProfileContainer=styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    align-items: center;
    height: 60%;
`
export const Title=styled.div`
    width: 90%;
    text-align: left;
    font-size: 22px;
    margin-top: 70px;
    font-weight: bold;
`
export const Wrapper2=styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
