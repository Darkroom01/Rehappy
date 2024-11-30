import { Reset } from "styled-reset";
import React from "react";
import TopBarComponent from "../../components/TopBarComponent"; // 상단바 컴포넌트
import {
    Wrapper,
    InfoContainer,
    LeftSection,
    CenterSection,
    RightSection,
    WeatherIcon,
    GraphTipContainer,
    GraphSection,
    GraphContainer,
    GraphLine,
    GraphPoint,
    TipSection,
} from "./style";
import { getTodayTips } from "./healthTips";
import Weather from "../../images/weatherIcons/weather_01.png";

// 오늘의 Tip 선택 로직
const todayTips = getTodayTips();

export default function Main() {
    return (
        <>
            <Reset />
            {/* 상단바 */}
            <TopBarComponent />

            {/* 메인 페이지 내용 */}
            <Wrapper>
                {/* 사용자 정보 및 날씨 정보 */}
                <InfoContainer>
                    <LeftSection>
                        <h2>
                            <span>김철수</span> 님의
                            <br />
                            마지막 증상 기록은
                            <br />
                            <span>7일 전</span> 입니다.
                        </h2>
                    </LeftSection>
                    <CenterSection>
                        <button>증상 기록
                            <br /> 바로가기
                        </button>
                    </CenterSection>
                    <RightSection>
                        <WeatherIcon src={Weather} alt="날씨 아이콘" />
                        <h2>17°C</h2>
                        <p>일교차가 큽니다. 오늘 날씨에는 감기 조심하세요!</p>
                        <p>습도: 65%</p>
                        <p>바람: 남서풍 5m/s</p>
                        <p>미세먼지: 보통</p>
                    </RightSection>
                </InfoContainer>

                {/* 그래프와 팁 섹션 */}
                <GraphTipContainer>
                    <GraphSection>
                        <h3>통증 그래프</h3>
                        <GraphContainer>
                            <GraphLine>
                                <GraphPoint left="10%" top="70%">4</GraphPoint>
                                <GraphPoint left="30%" top="50%">5</GraphPoint>
                                <GraphPoint left="50%" top="40%">6</GraphPoint>
                                <GraphPoint left="70%" top="50%">5</GraphPoint>
                                <GraphPoint left="90%" top="70%">5</GraphPoint>
                            </GraphLine>
                        </GraphContainer>
                    </GraphSection>

                    <TipSection>
                        <h3>오늘의 건강 Tip!</h3>
                        <ul>
                            {todayTips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </TipSection>
                </GraphTipContainer>
            </Wrapper>
        </>
    );
}
