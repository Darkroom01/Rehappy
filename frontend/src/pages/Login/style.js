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
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #D7E8FF;
    border-radius:0 12px 12px 0;
    align-items: center;
`
export const Inputs =styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-left: 50px;
    margin-bottom: 20px;
`
export const InputName =styled.div`
    font-family: NanumGothic;
    margin-bottom: 5px;
`
export const Input=styled.input`
    width: 80%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #d9d9d9;
`
export const Right=styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`
export const Logo=styled.img`
    width: 300px;
`
export const LoginBtn=styled.button`
    background-color: #110078;
    height: 45px;
    width: 70%;
    border-radius: 12px;
    border: none;
    cursor: pointer;
    color: white;
    font-family: NanumGothic;
    margin-top: 10px;
`