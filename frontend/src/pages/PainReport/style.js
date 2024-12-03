import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 50px 0;
`
export const ReportContent = styled.div`
    white-space: pre-wrap;
    width: 800px;
    padding: 30px 50px;
    margin: 20px 0;
    overflow-y: auto;
    line-height: 1.5;
    border-radius: 2em;
    border: 3px dashed #110078;
    background-color: #D7E8FF;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.43);
    //display: flex;
    //justify-content: center;
    //flex-direction: column;
    //align-items: center;
`
export const PDFDownload = styled.div`
    background-color: #FFAE00;
    border-radius: 2em;
    font-weight: bold;
    font-size: 18px;
    display: inline-block;
    padding: 15px 20px;
    color: white;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.22);
    margin-top: 20px;
    user-select: none;
    cursor: pointer;
    
    &:hover {
        background-color: #110078;
    }
`