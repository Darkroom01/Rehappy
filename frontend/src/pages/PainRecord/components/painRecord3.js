import React, { useState } from "react";

export default function PainRecord3({ onSubmit, painIntensity }) {
    const [sliderValue, setSliderValue] = useState(painIntensity); // 초기값은 props로 받은 painIntensity로 설정

    const handleSliderChange = (e) => {
        setSliderValue(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(sliderValue); // 슬라이더 값 전달
    };

    return (
        <div>
            <h2>통증 강도를 선택해 주세요.</h2>
            <div>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={sliderValue}
                    onChange={handleSliderChange}
                />
                <p>현재 통증 강도: {sliderValue}</p>
            </div>
            <button onClick={handleSubmit}>제출</button>
        </div>
    );
}
