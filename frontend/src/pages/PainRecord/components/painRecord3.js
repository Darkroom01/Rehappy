import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Title = styled.h2`
    font-size: 50px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const SliderContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 50px;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
`;

const SliderLabelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 14px;
    margin-top: 10px;
    color: #333;
`;

const SliderWrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 600px;
    height: 40px;
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
    position: absolute;
    bottom: 40px;
    right: 40px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    background-color: #110078;
    border: none;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
        background-color: #0d0059;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export default function PainRecord3({ onSubmit, painIntensity }) {
    const [sliderValue, setSliderValue] = useState(painIntensity); // 초기값은 props로 받은 painIntensity로 설정

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(sliderValue); // 슬라이더 값 전달
    };

    return (
        <Container>
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
