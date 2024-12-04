import styled from "styled-components";

// 전체 Wrapper
export const Wrapper = styled.div`
    font-family: "Arial", sans-serif;
    color: #333;
    box-sizing: border-box;
    width: 100%;
    height: calc(100vh - 100px); /* 전체 높이에서 100px(상단바) 제외 */
    position: relative;
`;

// 사용자 정보 및 날씨 섹션 컨테이너
export const InfoContainer = styled.div`
    height: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

// 왼쪽 섹션
export const LeftSection = styled.div`
    flex: 0.7;
    display: flex;
    margin-left: 40px;
    align-items: center; // 수직 정렬 가운데

    h2 {
        font-size: calc(2.4vw + 14px); // 동적으로 조절
        line-height: 1.4;
        text-align: left; // 텍스트 자체는 왼쪽 정렬

        span {
            font-weight: bold;
        }

        span:first-of-type {
            color: #00008b;
        }

        span:last-of-type {
            color: #FFAE00; 
        }
    }
`;

// 가운데 섹션
export const CenterSection = styled.div`
    flex: 0.5;
    height: 80%;
    display: flex;
    margin-right: 20px;
    align-items: center;
    justify-content: center;
`;

export const Button = styled.button`
    display: flex;
    flex-direction: row; /* 텍스트와 SVG를 수평 정렬 */
    align-items: center; /* 텍스트와 SVG를 수직 가운데 정렬 */
    justify-content: center;
    height: 100%;
    width: 100%;
    background: #ffcc66;
    border: 3px solid #FFAE00;
    border-radius: 40px;
    font-size: calc(2.0vw + 15px);
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    outline: none;
    text-align: center;

    &:hover {
        background: #ffa500;
    }

    svg {
        margin-left: 40px; /* 텍스트와 SVG 사이 여백 */
        stroke: #fff; /* SVG 선 색상 변경 */
        stroke-width: 8;
        fill: none; /* SVG 채우기 색상 없음 */
        width: 40px; 
        height: 80px; 
    }
`;


// 오른쪽 섹션
export const RightSection = styled.div`
    flex: 1;
    height: 80%;
    background: #fff8e6;
    border: 3px solid #FFAE00;
    border-radius: 40px;
    margin-right: 40px;
    display: flex;
    flex-direction: row; /* 수평 정렬 */
    align-items: center; /* 세로 가운데 정렬 */
    justify-content: space-between; /* 내부 요소 간격 */
`;

export const WeatherMain = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column; /* 아이콘과 온도를 수직 정렬 */
    align-items: center; /* 가운데 정렬 */
    justify-content: center;
    margin-left: 20px;
    margin-right: 20px; /* 오른쪽 텍스트와 간격 추가 */

    h2 {
        font-size: 40px; /* 현재 온도 크기 */
        color: #ff6f00;
        margin-top: 5px;
        margin-bottom: 25px;
    }
`;

export const GraphTipContainer = styled.div`
    height: calc(100% - 40% - 90px);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 그래프 섹션
export const GraphSection = styled.section`
    flex: 1.2;
    background: #e6f7ff;
    border: 3px solid #110078;
    margin-left: 40px;
    margin-right: 20px;
    border-radius: 40px;
    height: 100%;

    h3 {
        font-size: 30px;
        margin-left: 40px;
        margin-top: 40px;
        margin-bottom: 20px;
        font-weight: bold;
        color: #110078;
    }

    &:hover {
        //background: #110078;
    }
`;

// 건강 팁 섹션
export const TipSection = styled.section`
    flex: 1;
    background: #fff;
    border: 3px solid #110078;
    margin-right: 40px;
    border-radius: 40px;
    align-items: flex-start; /* 왼쪽 정렬 */
    height: 100%;

    h3 {
        font-size: 40px;
        margin-left: 40px;
        margin-top: 40px; 
        margin-bottom: 30px;
        font-weight: bold;
        color: #110078;
    }
`;

export const HealthTips = styled.section`
    flex: 1;
    font-size: 20px;
    border-radius: 40px;
    align-items: flex-start; /* 왼쪽 정렬 */
    margin-left: 40px;
    margin-right: 40px;
    height: 100%;
`;

