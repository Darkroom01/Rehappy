import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const DateWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const DateText = styled.h2`
    font-size: 60px;
    font-weight: bold;
    color: #333;
    margin-right: 20px;
`;

const Title = styled.h2`
    font-size: 50px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 40px;
`;

// 스타일링은 기존과 동일
const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 50px;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
`;

const SliderWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 40px;
`;

const SliderLabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    color: #333;
`;

const Slider = styled.input`
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    background: #e6f0ff;
    border-radius: 5px;
    outline: none;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 30px;
        height: 30px;
        background: #ffc73b;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }

    &::-moz-range-thumb {
        width: 30px;
        height: 30px;
        background: #ffc73b;
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
`;

const Scale = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: #110078;
    margin-top: 5px;
`;

const CurrentValue = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: #555;
    margin-top: 20px;
`;

const SubmitButton = styled.button`
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    font-size: 20px;
    font-weight: bold;
    color: #110078;
    background-color: #D7E8FF;
    border: 3px solid #110078;
    border-radius: 20px;
    cursor: pointer;
    z-index: 1000;

    &:hover {
        color: white;
        background-color: #110078;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export default function PainRecord3({ onSubmit, painIntensity, selectedDate }) {
    const [sliderValue, setSliderValue] = useState(painIntensity);

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(sliderValue); // 슬라이더 값을 부모로 전달
    };

    // 날짜 형식 변환 함수
    const formatSelectedDate = (date) => {
        if (!date) return "날짜가 선택되지 않았습니다.";
        const days = ["일", "월", "화", "수", "목", "금", "토"];
        const d = new Date(date);
        return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(
            d.getDate()
        ).padStart(2, "0")} (${days[d.getDay()]})`;
    };

    const formattedDate = formatSelectedDate(selectedDate);

    return (
        <Container>
            <DateWrapper>
                <DateText>{formattedDate}</DateText>
            </DateWrapper>
            <Title>현재 느끼는 통증의 강도를 선택해 주세요.</Title>
            <SliderContainer>
                <SliderWrapper>
                    <Slider
                        type="range"
                        min="0"
                        max="10"
                        step="1"
                        value={sliderValue}
                        onChange={handleSliderChange}
                    />
                </SliderWrapper>
                <Scale>
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                </Scale>
                <SliderLabelContainer>
                    <span>통증이 없음</span>
                    <span>상상할 수 없을 정도의 심한 통증</span>
                </SliderLabelContainer>
            </SliderContainer>
            <CurrentValue>현재 통증 강도: {sliderValue}</CurrentValue>
            <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
        </Container>
    );
}
