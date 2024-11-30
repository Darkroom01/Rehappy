import styled from "styled-components";

// 전체 Wrapper
export const Wrapper = styled.div`
    font-family: "Arial", sans-serif;
    padding: 20px;
    background-color: #f9fafc;
    color: #333;
    height: 100vh;
    box-sizing: border-box;
`;

// 사용자 정보 및 날씨 섹션 컨테이너
export const InfoContainer = styled.div`
    height: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    gap: 20px;
`;

// 왼쪽 섹션
export const LeftSection = styled.div`
    flex: 0.6;
    padding: 0 20px; // 좌우로만 패딩 추가
    display: flex;
    align-items: center; // 수직 정렬 가운데
    justify-content: center; // 전체적으로 가운데 정렬

    h2 {
        font-size: calc(2vw + 16px); // 섹션 크기에 따라 동적으로 조절하며, 가로 크기에 맞춤
        line-height: 1.4;
        text-align: left; // 텍스트 자체는 왼쪽 정렬

        span {
            font-weight: bold;
        }

        span:first-of-type {
            color: #00008b; // 남색
        }

        span:last-of-type {
            color: #ffcc00; // 노란색
        }
    }
`;

// 가운데 섹션
export const CenterSection = styled.div`
    flex: 0.6;
    height: 60%;
    display: flex;
    padding: 0 20px; 
    align-items: center;
    justify-content: center;

    button {
        height: 100%;
        width: 100%;
        background: #ffcc66;
        border: none;
        padding: 0px 20px;
        border-radius: 40px;
        font-size: calc(1.5vw + 8px);
        cursor: pointer;
        font-weight: bold;
        color: #fff;

        &:hover {
            background: #ffa500;
        }
    }
`;

// 오른쪽 섹션
export const RightSection = styled.div`
    flex: 1;
    height: 60%;
    background: #fff8e6;
    border-radius: 40px;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
        font-size: 24px;
        color: #ff4500;
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        color: #555;
        margin: 5px 0;
    }
`;

export const WeatherIcon = styled.img`
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
`;

// 그래프와 팁 섹션 컨테이너 (2분할)
export const GraphTipContainer = styled.div`
    height: 50%;
    display: flex;
    justify-content: space-between;
    gap: 20px;
`;

// 그래프 섹션
export const GraphSection = styled.section`
    height: 40vh;
    flex: 1.2;
    background: #e6f7ff;
    padding: 20px;
    border-radius: 8px;
    text-align: center;

    h3 {
        font-size: 18px;
        margin-bottom: 10px;
    }
`;

export const GraphContainer = styled.div`
    position: relative;
    width: 100%;
    height: 200px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

export const GraphLine = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

export const GraphPoint = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    background: #0066cc;
    border-radius: 50%;
    color: white;
    font-size: 12px;
    text-align: center;
    line-height: 10px;
    transform: translate(-50%, -50%);
    left: ${(props) => props.left};
    top: ${(props) => props.top};
`;

// 팁 섹션
export const TipSection = styled.section`
    flex: 1;
    background: #fff;
    padding: 0 20px;
    border-radius: 8px;
    text-align: center;

    h3 {
        font-size: 2vw; // 김철수 글자 스타일과 동일한 크기
        margin-bottom: 10px;
        font-weight: bold;
        color: #00008b; // 남색
    }

    ul li span {
        font-size: calc(1.5vw + 10px); // 건강 팁 글씨 크기를 조금 더 크게 설정
        font-weight: bold;
    }
`;

