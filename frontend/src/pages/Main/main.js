import { Reset } from "styled-reset";
import React, { useState, useEffect } from "react";
import TopBarComponent from "../../components/TopBarComponent"; // 상단바 컴포넌트
import {
    Wrapper,
    InfoContainer,
    LeftSection,
    CenterSection,
    RightSection,
    WeatherMain,
    WeatherDetails,
    WeatherIcon,
    GraphTipContainer,
    GraphSection,
    GraphContainer,
    GraphLine,
    GraphPoint,
    TipSection,
    HealthTips,
} from "./style";
import { getTodayTips } from "./healthTips";
import { fetchWeather, fetchForecast } from "./weatherService"; // fetchForecast 추가

// 오늘의 Tip 선택 로직
const todayTips = getTodayTips();

export default function Main() {
    const [weatherData, setWeatherData] = useState(null);
    const [todayTemp, setTodayTemp] = useState({ maxTemp: null, minTemp: null });

    // 현재 날씨 정보 가져오기
    useEffect(() => {
        async function getWeather() {
            const data = await fetchWeather("gyeongsan-si");
            if (data) {
                setWeatherData(data);
            }
        }
        getWeather();
    }, []);

    // 오늘의 최고/최저 기온 가져오기
    useEffect(() => {
        async function getForecast() {
            const data = await fetchForecast("gyeongsan-si");
            if (data) {
                setTodayTemp(data);
            }
        }
        getForecast();
    }, []);

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
                            마지막 통증 기록은
                            <br />
                            <span>7일 전</span> 입니다.
                        </h2>
                    </LeftSection>
                    <CenterSection>
                        <button>통증 기록
                            <br /> 바로가기
                        </button>
                    </CenterSection>
                    <RightSection>
                        {weatherData ? (
                            <>
                                <WeatherMain>
                                    <WeatherIcon
                                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                        alt="날씨 아이콘"
                                    />
                                    <h2>{weatherData.main.temp}°C</h2> {/* 현재 온도 */}
                                </WeatherMain>
                                <WeatherDetails>
                                    <p>{todayTemp.maxTemp}° / {todayTemp.minTemp}°</p>
                                    <p>
                                        체감 {weatherData.main.feels_like}° / {weatherData.weather[0].description} /
                                        습도 {weatherData.main.humidity}% / 풍속 {weatherData.wind.speed}m/s
                                    </p>
                                    <p>찬바람 부는 겨울이에요. 오늘 날씨에는 감기 조심하세요!</p>
                                </WeatherDetails>
                            </>
                        ) : (
                            <p>날씨 정보를 불러오는 중입니다...</p>
                        )}
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
                        <h3>오늘의 통증 관리 Tip!</h3>
                        <HealthTips>
                            <ul>
                                {todayTips.map((tip, index) => (
                                    <li key={index}>{tip}</li>
                                ))}
                            </ul>
                        </HealthTips>
                    </TipSection>
                </GraphTipContainer>
            </Wrapper>
        </>
    );
}
