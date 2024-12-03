import styled from "styled-components";

export const Wrapper=styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const Contain = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 고정된 2열 */
    gap: 20px; /* 각 아이템 간 간격 */
    justify-content: center; /* 가운데 정렬 */
    margin-top: 30px;
    margin-bottom: 30px;
`;

export const Container=styled.div`
    width: 550px;
    height: 320px;
    background-color: #D7E8FF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
`
export const Location=styled.div`
    font-size: 20px;
    width: 500px;
    margin-bottom: 10px;
    text-align: left;
    
`