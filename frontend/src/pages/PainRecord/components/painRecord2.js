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

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 두 열로 구성 */
    gap: 20px; /* 항목 간 간격 */
    max-width: 1500px;
`;

const Option = styled.div`
    display: flex;
    align-items: center;
    font-size: 40px;
`;

const Checkbox = styled.input`
    margin-right: 20px;
    transform: scale(3); /* 체크박스 크기 조정 */
`;

const OtherInput = styled.input`
    margin-left: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 300px;
`;

const NextButton = styled.button`
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

export default function PainRecord2({ onNext, selectedPainTypes, setSelectedPainTypes }) {
    const painOptions = [
        "욱신거리는",
        "콕콕 쑤시는",
        "찌르듯이 아픈",
        "날카로운 양상의",
        "뒤틀리듯이 아픈",
        "갉아먹듯이 아픈",
        "화끈거리는",
        "아리는",
        "뻐근한",
        "누르면 아픈",
        "쪼개지듯 아픈",
        "기타",
    ];

    const [otherPain, setOtherPain] = useState("");

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (value === "기타" && !checked) {
            setOtherPain(""); // "기타" 선택 해제 시 입력 필드 초기화
            setSelectedPainTypes((prev) => prev.filter((item) => item !== "기타")); // "기타" 항목 제거
        } else if (value === "기타" && checked) {
            setSelectedPainTypes((prev) => [...prev, "기타"]);
        } else {
            setSelectedPainTypes((prev) =>
                checked ? [...prev, value] : prev.filter((item) => item !== value)
            );
        }
    };

    const handleOtherPainBlur = () => {
        if (otherPain.trim()) {
            // 기타에 입력된 값만 저장
            setSelectedPainTypes((prev) =>
                prev.includes("기타") ? [...prev.filter((item) => item !== "기타"), otherPain.trim()] : prev
            );
        }
    };

    return (
        <Container>
            <Title>다음 중 해당되는 통증 양상을 선택해 주세요.</Title>
            <Grid>
                {painOptions.map((option, index) => (
                    <Option key={index}>
                        <Checkbox
                            type="checkbox"
                            value={option}
                            checked={selectedPainTypes.includes(option)}
                            onChange={handleCheckboxChange}
                        />
                        {option}
                        {option === "기타" && selectedPainTypes.includes("기타") && (
                            <OtherInput
                                type="text"
                                placeholder="기타 통증 양상 입력"
                                value={otherPain}
                                onChange={(e) => setOtherPain(e.target.value)}
                                onBlur={handleOtherPainBlur} // 입력창을 벗어나면 저장
                            />
                        )}
                    </Option>
                ))}
            </Grid>
            <NextButton onClick={onNext} disabled={selectedPainTypes.length === 0}>
                다음
            </NextButton>
        </Container>
    );
}
