import React, { useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import Cookies from "js-cookie";
import {Container, PDFDownload, ReportContent} from "./style";
import {Reset} from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent"; // js-cookie 라이브러리 사용

const PainReport = () => {
    const [reportContent, setReportContent] = useState(""); // 보고서 내용 저장
    const [loading, setLoading] = useState(false); // 로딩 상태


    const formatContent = (content) => {
        const formattedContent = content
            .replace(
                /\*\*(.*?)\*\*/g, // **으로 감싸진 텍스트를 bold와 font-size 스타일 적용
                "<span style='font-weight: bold; font-size: 20px;'>$1</span>"
            )
            .replace(
                /^- /gm, // -로 시작하는 문장의 앞에 공백 추가
                "    - "
            );
        return formattedContent;
    };


    // 통증 보고서 생성 요청
    const generateReport = async () => {
        setLoading(true);
        // 쿠키에서 JWT 토큰 가져오기
        const token = Cookies.get("authToken"); // 'token'은 쿠키에 저장된 키

        if (!token) {
            throw new Error("토큰이 없습니다. 로그인 후 다시 시도해주세요.");
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/api/reports/왼손", // Spring Boot API 엔드포인트
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // JWT 토큰을 헤더에 추가
                    },
                }
            );

            // 보고서 내용 저장
            setReportContent(formatContent(response.data)); // 포맷팅된 내용을 저장
            console.log("보고서 내용:", response.data);

        } catch (error) {
            console.error("보고서 생성 중 오류 발생:", error);
            alert("보고서를 생성하는 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    // PDF 다운로드
    const downloadPdf = () => {
        const doc = new jsPDF();

        const margin = 10;
        const pageHeight = doc.internal.pageSize.height;

        // PDF에 텍스트 추가 (줄바꿈 처리)
        const plainTextContent = reportContent.replace(/<\/?[^>]+(>|$)/g, ""); // HTML 태그 제거
        const lines = doc.splitTextToSize(plainTextContent, 180); // 한 줄에 180px 너비로 텍스트 나누기
        let cursorY = margin;

        lines.forEach((line) => {
            if (cursorY + 10 > pageHeight - margin) {
                doc.addPage(); // 페이지 추가
                cursorY = margin;
            }
            doc.text(line, margin, cursorY);
            cursorY += 10;
        });

        doc.save("pain_report.pdf"); // 파일 다운로드
    };

    return (
        <>
            <Reset />
            <TopBarComponent />
            <Container>
                {/*<h2>통증 기록 보고서</h2>*/}
                <button onClick={generateReport} disabled={loading} style={{ marginBottom: '20px' }}>
                    {loading ? "생성 중..." : "보고서 생성"}
                </button>

                {reportContent && (
                    <>
                        <ReportContent dangerouslySetInnerHTML={{ __html: reportContent }} // HTML을 렌더링
                        ></ReportContent>
                        <PDFDownload onClick={downloadPdf}>PDF 다운로드</PDFDownload>
                    </>
                )}
            </Container>
        </>

    );
};

export default PainReport;
