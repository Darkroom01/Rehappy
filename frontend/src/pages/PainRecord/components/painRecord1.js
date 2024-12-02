import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const DateWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
`;

const DateText = styled.h2`
    font-size: 60px;
    font-weight: bold;
    color: #333;
    margin-right: 20px;
`;

const ChangeDateContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ChangeDateButton = styled.button`
    font-size: 20px;
    padding: 10px 20px;
    color: #110078;
    background-color: #D7E8FF;
    border: 3px solid #110078;
    border-radius: 20px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        color: #110078;
        background-color: #ffc73b;
    }
`;

const DateInput = styled.input`
    margin-left: 20px; /* 버튼 오른쪽 여백 */
    padding: 0.5rem;
    font-size: 1.6rem;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const InstructionText = styled.p`
    font-size: 50px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #555;
`;

const InputContainer = styled.div`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TimeSelect = styled.select`
    font-size: 1.6rem;
    padding: 0.5rem;
    margin: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    text-align: center;
`;

const NextButton = styled.button`
    margin-top: 20px;
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

export default function PainRecord1({ onNext, selectedParts }) {
    const days = ["일", "월", "화", "수", "목", "금", "토"];

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const formattedDate = `${selectedDate.getFullYear()}/${String(
        selectedDate.getMonth() + 1
    ).padStart(2, "0")}/${String(selectedDate.getDate()).padStart(2, "0")} (${days[selectedDate.getDay()]})`;

    const today = new Date().toISOString().split("T")[0];

    const [period, setPeriod] = useState(selectedDate.getHours() < 12 ? "AM" : "PM");
    const [hour, setHour] = useState(String((selectedDate.getHours() % 12) || 12).padStart(2, "0"));
    const [minute, setMinute] = useState(
        String(Math.floor(selectedDate.getMinutes() / 10) * 10).padStart(2, "0")
    );

    const handleDateChange = (event) => {
        setSelectedDate(new Date(event.target.value));
    };

    const handleNextClick = () => {
        if (selectedParts.length === 0) {
            alert("통증 발생 부위를 선택해 주세요.");
        } else if (hour === "" || minute === "") {
            alert("통증 발생 시간을 모두 선택해 주세요.");
        } else {
            const formattedDate = selectedDate.toISOString().split("T")[0]; // yyyy-mm-dd 형식
            const formattedTime = `${hour}:${minute}`; // HH:mm 형식
            onNext(formattedDate, formattedTime); // 날짜와 시간 전달
        }
    };


    return (
        <Container>
            <DateWrapper>
                <DateText>{formattedDate}</DateText>
                <ChangeDateContainer>
                    <ChangeDateButton onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}>
                        날짜 변경
                    </ChangeDateButton>
                    {isDatePickerOpen && (
                        <DateInput
                            type="date"
                            value={selectedDate.toISOString().split("T")[0]}
                            onChange={handleDateChange}
                            max={today} // 오늘 날짜까지 선택 가능
                        />
                    )}
                </ChangeDateContainer>
            </DateWrapper>
            <InstructionText>통증 발생 부위 및 시간을 선택해 주세요.</InstructionText>
            <InputContainer>
                <label htmlFor="pain-time">통증 발생 시간</label>
                <div>
                    <TimeSelect
                        id="pain-period"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                    >
                        <option value="AM">오전</option>
                        <option value="PM">오후</option>
                    </TimeSelect>
                    <TimeSelect
                        id="pain-hour"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                    >
                        <option value="">시간</option>
                        {Array.from({ length: 12 }, (_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                {String(i + 1).padStart(2, "0")}
                            </option>
                        ))}
                    </TimeSelect>
                    :
                    <TimeSelect
                        id="pain-minute"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                    >
                        <option value="">분</option>
                        {Array.from({ length: 6 }, (_, i) => (
                            <option key={i} value={String(i * 10).padStart(2, "0")}>
                                {String(i * 10).padStart(2, "0")}
                            </option>
                        ))}
                    </TimeSelect>
                </div>
            </InputContainer>
            <NextButton onClick={handleNextClick}>다음</NextButton>
        </Container>
    );
}
