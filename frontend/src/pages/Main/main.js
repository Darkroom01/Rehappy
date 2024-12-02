import { Reset } from "styled-reset";
import React, { useState, useEffect } from "react";
import TopBarComponent from "../../components/TopBarComponent";
import {
    Wrapper,
    InfoContainer,
    LeftSection,
    CenterSection,
    Button,
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
import { fetchWeather, fetchForecast } from "./weatherService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const todayTips = getTodayTips();

export default function Main() {
    const [weatherData, setWeatherData] = useState(null);
    const [todayTemp, setTodayTemp] = useState({ maxTemp: null, minTemp: null });
    const [username, setUsername] = useState(""); // 사용자 이름 상태 추가
    const [lastPainDate, setLastPainDate] = useState(null); // 마지막 통증 기록 날짜 상태 추가
    const [daysSinceLastPain, setDaysSinceLastPain] = useState(null); // 며칠 전인지 상태 추가
    const navigate = useNavigate();
    const jwtToken = Cookies.get("authToken");

    useEffect(() => {
        if (jwtToken) {
            try {
                const decoded = jwtDecode(jwtToken); // JWT 디코딩
                setUsername(decoded.username || "사용자"); // username 가져오기
            } catch (error) {
                console.error("JWT 디코딩 실패:", error);
            }
        }
    }, [jwtToken]);

    useEffect(() => {
        async function fetchLastPainDate() {
            try {
                const response = await fetch("http://localhost:8080/api/pains", {
                    headers: {
                        Authorization: `Bearer ${jwtToken}`, // JWT 토큰 포함
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        // 최신 날짜 찾기
                        const latestRecord = data.reduce((latest, record) => {
                            const recordDate = new Date(record.painDate);
                            return recordDate > new Date(latest.painDate) ? record : latest;
                        });

                        const lastDate = new Date(latestRecord.painDate); // 최신 기록 날짜
                        setLastPainDate(lastDate);

                        const today = new Date();
                        const differenceInTime = today - lastDate; // 밀리초 차이 계산
                        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24)); // 일 단위로 변환
                        setDaysSinceLastPain(differenceInDays);
                    } else {
                        setLastPainDate(null);
                        setDaysSinceLastPain(null);
                    }
                } else {
                    console.error("통증 기록을 가져오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("통증 기록 가져오기 실패:", error);
            }
        }

        if (jwtToken) {
            fetchLastPainDate();
        }
    }, [jwtToken]);

    const handleGoPainRecord = () => {
        navigate("/painRecord");
    };

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
            <TopBarComponent />
            <Wrapper>
                <InfoContainer>
                    <LeftSection>
                        <h2>
                            <span>{username}</span> 님의
                            <br />
                            {daysSinceLastPain !== null ? (
                                <>
                                    마지막 통증 기록은
                                    <br />
                                    <span>{`${daysSinceLastPain}일 전`}</span> 입니다.
                                </>
                            ) : (
                                <>통증 기록이 없습니다.</>
                            )}
                        </h2>
                    </LeftSection>

                    <CenterSection onClick={handleGoPainRecord}>
                        <Button>
                            통증 기록
                            <br /> 바로가기
                            <svg
                                width="63"
                                height="122"
                                viewBox="0 0 63 122"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M1 1L61 61L1 121" />
                            </svg>
                        </Button>
                    </CenterSection>
                    <RightSection>
                        {weatherData ? (
                            <>
                                <WeatherMain>
                                    <WeatherIcon
                                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                        alt="날씨 아이콘"
                                    />
                                    <h2>{weatherData.main.temp}°C</h2>
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
