import styled from "styled-components";

export const ContentsWrapper = styled.div`
    width: 1000px;
    height: auto;
    margin: 0 auto;
`
export const Category = styled.div`
    background-color: white;
    font-weight: bold;
    padding: 15px 20px;
    font-size: 16px;
    border: 2px solid #FFAE00;
    border-radius: 2em;
    cursor: pointer;
    user-select: none;
`
export const OptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    position: absolute;
    background-color: #FFD884;
    width: 180px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    border: 2px solid white;
    border-radius: 20px;
    overflow: hidden;
`
export const Option = styled.a`
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-weight: bold;
`
export const Content = styled.div`
    width: calc(100% - 40px);
    height: 80px;
    padding: 0 20px;
    background-color: #D7E8FF;
    margin: 20px auto;
    border-radius: 20px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
