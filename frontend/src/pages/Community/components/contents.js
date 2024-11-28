import React, { useState } from "react";
import {Category, Option, Content, ContentsWrapper, OptionWrapper} from "./style";

export default function Contents() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("전체 보기"); // 기본값: "메뉴"

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const selectOption = (option) => {
        setSelectedOption(option); // 선택한 옵션으로 버튼 텍스트 변경
        setDropdownOpen(false); // 드롭다운 닫기
    };

    const closeDropdown = (e) => {
        if (!e.target.closest(".dropdown")) {
            setDropdownOpen(false);
        }
    };

    React.useEffect(() => {
        window.addEventListener("click", closeDropdown);
        return () => {
            window.removeEventListener("click", closeDropdown);
        };
    }, []);

    return (
        <ContentsWrapper>
            {/* 드롭다운 메뉴 */}
            <p style={{fontSize:'14px', color:'gray',margin:'5px 0'}}>카테고리</p>
            <div className="dropdown" style={{ position: "relative", display: "inline-block" }}>
                <Category onClick={toggleDropdown}>{selectedOption}</Category>
                {/* 드롭다운 메뉴 내용 */}
                {dropdownOpen && (
                    <OptionWrapper>
                        <Option
                            href=""
                            onClick={() => selectOption("전체 보기")}
                        >
                            전체 보기
                        </Option>
                        <Option
                            href="#option1"
                            onClick={() => selectOption("통증 관리 팁")}
                        >
                            통증 관리 팁
                        </Option>
                        <Option
                            href="#option2"
                            onClick={() => selectOption("질병 및 통증 정보")}
                        >
                            질병 및 통증 정보
                        </Option>
                        <Option
                            href="#option3"
                            onClick={() => selectOption("치료 및 재활 경험")}
                        >
                            치료 및 재활 경험
                        </Option>
                        <Option
                            href="#option4"
                            onClick={() => selectOption("병원 리뷰")}
                        >
                            병원 리뷰
                        </Option>
                        <Option
                            href="#option5"
                            onClick={() => selectOption("건강 상담")}
                        >
                            건강 상담
                        </Option>
                    </OptionWrapper>
                )}
            </div>
            <Content>
            </Content>
            <Content>
                <p>글 제목</p>
                <p>작성자 우더니</p>
            </Content>

        </ContentsWrapper>
    );
}
