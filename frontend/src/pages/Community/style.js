import styled from "styled-components";

export const SearchWrapper = styled.div`
    width: 600px;
    height: 50px;
    margin: 30px auto;
    //background-color: gray;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
`
export const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 30px;
    border: 3px solid #29188f;
    padding: 0 20px;
    font-size: 16px;
`
export const SearchButton = styled.div`
    position: absolute;
    right: 0;
    margin-right: 20px;
    cursor: pointer;
`