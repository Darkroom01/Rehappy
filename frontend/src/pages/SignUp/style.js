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