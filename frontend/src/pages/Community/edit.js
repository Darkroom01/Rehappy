import {Reset} from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent";
import {Category, ContentsWrapper, NewContent, NewTitle, SubmitButton} from "./style";
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useLocation, useNavigate} from "react-router-dom";

export default function Edit() {


    const token = Cookies.get('authToken');
    const location = useLocation();
    const { category, title, content } = location.state || {};
    const [titleValue, setTitleValue] = useState(title); // 제목 저장
    const [contentValue, setContentValue] = useState(content); // 본문 내용 저장
    const [selectedCategory, setSelectedCategory] = useState(category); // 카테고리 영문 저장
    const [selectedCategoryNum, setSelectedCategoryNum] = useState(null) // 카테고리 숫자 저장. 데이터 처리용

    // 카테고리 번호 초기화
    useEffect(() => {
        const categoryNumMap = {
            'PAIN_TIPS': 1,            // 통증 관리 팁
            'DISEASE_INFO': 2,         // 질병 및 통증 정보
            'TREATMENT_EXPERIENCE': 3, // 치료 및 재활 경험
            'HOSPITAL_REVIEW': 4,      // 병원 리뷰
            'HEALTH_CONSULTING': 5     // 건강 상담
        };
        if (categoryNumMap[category]) {
            setSelectedCategoryNum(categoryNumMap[category]);
        }
    }, []);

    // Category 클릭 핸들러
    const handleCategoryClick = (index) => {
        const categoryMap = {
            1: 'PAIN_TIPS',            // 통증 관리 팁
            2: 'DISEASE_INFO',         // 질병 및 통증 정보
            3: 'TREATMENT_EXPERIENCE', // 치료 및 재활 경험
            4: 'HOSPITAL_REVIEW',      // 병원 리뷰
            5: 'HEALTH_CONSULTING'     // 건강 상담
        };
        if (categoryMap[index]) {
            setSelectedCategory(categoryMap[index]);
        }
        setSelectedCategoryNum(index); // 선택된 Category 번호 저장
    };

    // 제목 핸들러
    const handleTitleInput = (e) => {
        setTitleValue(e.target.value);
    }

    // 본문 내용 핸들러
    const handleContentInput = (e) => {
        const element = e.target;
        setContentValue(element.textContent);

        // Placeholder 처리
        element.setAttribute('data-placeholder', element.textContent ? '' : '내용을 입력해주세요.');

        // 높이 자동 조정
        element.style.height = 'auto';
        element.style.height = `${element.scrollHeight}px`;
    }

    // 글 수정 완료 핸들러
    const handleSubmit = async() => {
        if (token) {
            if (titleValue && contentValue && selectedCategory) {
                console.log(titleValue, contentValue, selectedCategory)

                try {
                    await axios.put('http://localhost:8080/api/posts/1', null, {
                        params: {
                            title: titleValue,
                            content: contentValue,
                            category: selectedCategory,
                        },
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': '*/*'
                        }
                    });
                } catch (error) {
                    console.error('Failed to upload new post', error);
                    console.error('Error details:', error.response?.data);
                }
            } else {
                alert("모든 정보를 기입해 주세요.");
            }
        } else {
            alert("로그아웃 상태입니다.");
        }
    }
    return (
        <>
            <Reset/>
            <TopBarComponent/>
            <ContentsWrapper style={{
                marginTop: '50px',
                width: '800px',
                border: '2px solid #D7E8FF',
                borderRadius:'2em',
                padding: '60px 50px 110px 50px',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.18)'
            }}>
                <p style={{color: 'gray'}}>카테고리</p>
                {[
                    "통증 관리 팁",
                    "질병 및 통증 정보",
                    "치료 및 재활 경험",
                    "병원 리뷰",
                    "건강 상담",
                ].map((category, index) => (
                    <Category
                        key={index}
                        onClick={() => handleCategoryClick(index + 1)} // 번호가 1부터 시작하도록
                        $isCategorySelected={selectedCategoryNum === index + 1 ? 1 : 0} // styled components에 변수 제공
                    >
                        {category}
                    </Category>
                ))}
                <NewTitle
                    type="text"
                    value={titleValue}
                    onChange={handleTitleInput}
                    placeholder="제목을 입력해주세요."></NewTitle>
                <NewContent
                    contentEditable="true"
                    data-placeholder="내용을 입력해주세요."
                    onInput={handleContentInput}
                    dangerouslySetInnerHTML={{ __html: contentValue }}
                ></NewContent>
                <SubmitButton onClick={handleSubmit}>수정하기</SubmitButton>
            </ContentsWrapper>

        </>
    );
}