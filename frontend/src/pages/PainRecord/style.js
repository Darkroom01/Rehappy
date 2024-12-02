import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 100px);
`;

export const Container = styled.div`
    display: flex;
    flex: 1;
    height: 100%;
    width: 90%;
    margin: auto;
    //background-color: #f9f9f9;
    border-radius: 8px;
    //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const LeftSection = styled.div`
    flex: 1.2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem;
    border-right: 1px solid #ccc;
`;

export const RightSection = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 2rem;
`;

export const BodyDiagramContainer = styled.div`
    width: 100%;
    max-width: 300px;
    //border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    padding: 1rem;
    //box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;