import React, { useState } from "react";
import PainRecord1 from "./components/painRecord1";
import PainRecord2 from "./components/painRecord2";
import PainRecord3 from "./components/painRecord3";
import BodyDiagram from "../Test/BodyDiagram";
import {
    Wrapper,
    Container,
    LeftSection,
    RightSection,
    BodyDiagramContainer,
} from "./style";
import { Reset } from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent";

export default function PainRecord() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜 상태 추가
    const [selectedTime, setSelectedTime] = useState(""); // 선택된 시간 상태 추가
    const [selectedParts, setSelectedParts] = useState([]);
    const [selectedPainTypes, setSelectedPainTypes] = useState([]);

    const handleBodyPartSelection = (parts) => {
        if (step === 1) {
            setSelectedParts(parts);
        }
    };

    const handleDateTimeSelection = (date, time) => {
        setSelectedDate(date); // 날짜 저장
        setSelectedTime(time); // 시간 저장
    };

    const handleNextStep = () => setStep((prev) => prev + 1);

    const handleSubmit = (intensity) => {
        // 날짜 및 시간 형식 변환
        const formattedDate = selectedDate; // 이미 yyyy-mm-dd 형식
        const formattedTime = selectedTime; // 이미 HH:mm 형식

        // 선택된 부위, 양상, 강도, 날짜, 시간 출력
        alert(`통증 기록
        선택 날짜: ${formattedDate}
        선택 시간: ${formattedTime}
        선택된 부위: ${selectedParts.join(", ")}
        선택된 양상: ${selectedPainTypes.join(", ")}
        강도: ${intensity}
        `);

        // 초기화 또는 다음 단계로 이동
        setStep(1);
        setSelectedDate("");
        setSelectedTime("");
        setSelectedParts([]);
        setSelectedPainTypes([]);
    };

    return (
        <>
            <Reset />
            <TopBarComponent />
            <Wrapper>
                <Container>
                    <LeftSection>
                        <BodyDiagramContainer>
                            <BodyDiagram
                                value={selectedParts}
                                onChange={handleBodyPartSelection}
                                disabled={step > 1}
                            />
                        </BodyDiagramContainer>
                    </LeftSection>

                    <RightSection>
                        {step === 1 && (
                            <PainRecord1
                                onNext={(date, time) => {
                                    handleDateTimeSelection(date, time); // 날짜와 시간 전달
                                    handleNextStep();
                                }}
                                selectedParts={selectedParts}
                            />
                        )}
                        {step === 2 && (
                            <PainRecord2
                                onNext={handleNextStep}
                                selectedPainTypes={selectedPainTypes}
                                setSelectedPainTypes={setSelectedPainTypes}
                            />
                        )}
                        {step === 3 && <PainRecord3 onSubmit={handleSubmit} painIntensity={0} />}
                    </RightSection>
                </Container>
            </Wrapper>
        </>
    );
}
