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
import Cookies  from "js-cookie";

export default function PainRecord() {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜
    const [selectedTime, setSelectedTime] = useState(""); // 선택된 시간
    const [selectedParts, setSelectedParts] = useState([]); // 통증 위치
    const [selectedPainTypes, setSelectedPainTypes] = useState([]); // 통증 양상
    const [intensity, setIntensity] = useState(0); // 통증 강도
    const jwtToken = Cookies.get('authToken');

    const handleBodyPartSelection = (parts) => {
        if (step === 1) {
            setSelectedParts(parts);
        }
    };

    const handleDateTimeSelection = (date, time) => {
        setSelectedDate(date);
        setSelectedTime(time);
    };

    const handleIntensityChange = (value) => {
        setIntensity(value);
    };

    const handleNextStep = () => setStep((prev) => prev + 1);

    const handleSubmit = async () => {
        const payload = {
            painDate: selectedDate,
            painTime: selectedTime,
            intensity: intensity,
            location: selectedParts.join(", "), // 부위 콤마로 구분
            pattern: selectedPainTypes.join(", "), // 양상 콤마로 구분
        };

        console.log("전송할 데이터:", payload);

        try {
            const response = await fetch("http://localhost:8080/api/pains", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwtToken}`, // JWT 토큰 포함
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                alert("통증 기록이 성공적으로 저장되었습니다.");
            } else {
                const errorData = await response.json();
                console.error("응답 에러:", errorData);
                alert(`저장 실패: ${errorData.message || "알 수 없는 에러"}`);
            }
        } catch (error) {
            console.error("통증 기록 저장 중 에러:", error);
            alert("통증 기록 저장 중 문제가 발생했습니다.");
        }

        // 상태 초기화
        setStep(1);
        setSelectedDate("");
        setSelectedTime("");
        setSelectedParts([]);
        setSelectedPainTypes([]);
        setIntensity(0);
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
                                    handleDateTimeSelection(date, time);
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
                        {step === 3 && (
                            <PainRecord3
                                onSubmit={handleSubmit}
                                painIntensity={intensity}
                                onChangeIntensity={handleIntensityChange}
                            />
                        )}
                    </RightSection>
                </Container>
            </Wrapper>
        </>
    );
}
