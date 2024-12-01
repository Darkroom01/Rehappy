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
import {Reset} from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent";

export default function PainRecord() {
    const [step, setStep] = useState(1);
    const [selectedParts, setSelectedParts] = useState([]);
    const [selectedPainTypes, setSelectedPainTypes] = useState([]);

    const handleBodyPartSelection = (parts) => {
        if (step === 1) {
            setSelectedParts(parts);
        }
    };

    const handleNextStep = () => setStep((prev) => prev + 1);

    const handleSubmit = (intensity) => {
        alert(`통증 기록 완료! 선택된 양상: ${selectedPainTypes.join(", ")}, 강도: ${intensity}`);
        // 초기화 또는 다음 단계로 이동
        setStep(1);
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
                            <PainRecord1 onNext={handleNextStep} selectedParts={selectedParts} />
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
