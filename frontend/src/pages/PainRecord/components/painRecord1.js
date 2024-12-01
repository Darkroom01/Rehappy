import React from "react";
import styled from "styled-components";

// 스타일드 컴포넌트 정의
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
`;

const DateText = styled.h2`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #333;
`;

const InstructionText = styled.p`
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #555;
`;

const NextButton = styled.button`
    padding: 1rem 2rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export default function PainRecord1({ onNext, selectedParts }) {
    // 요일 배열
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    // 날짜 포맷: yyyy/mm/dd (요일)
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}/${String(
        currentDate.getMonth() + 1
    ).padStart(2, "0")}/${String(currentDate.getDate()).padStart(2, "0")} (${days[currentDate.getDay()]})`;

    const handleNextClick = () => {
        if (selectedParts.length === 0) {
            alert("통증 발생 부위를 선택해 주세요."); // 경고 메시지
        } else {
            onNext(); // 다음 단계로 이동
        }
    };

    return (
        <Container>
            <DateText>{formattedDate}</DateText>
            <InstructionText>통증 발생 부위를 <br/> 선택해 주세요.</InstructionText>
            <NextButton onClick={handleNextClick}>다음</NextButton>
        </Container>
    );
}
