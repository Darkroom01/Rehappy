import React from "react";

export default function PainRecord2({ onNext, selectedPainTypes, setSelectedPainTypes }) {
    const painOptions = [
        "욱신거리는",
        "콕콕 쑤시는",
        "찌르듯이 아픈",
        "날카로운 양상의",
        "뒤틀리듯이 아픈",
        "갉아먹듯이 아픈",
        "화끈거리는",
        "아리는",
        "뻐근한",
        "누르면 아픈",
        "쪼개지듯 아픈",
        "기타",
    ];

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setSelectedPainTypes((prev) =>
            checked ? [...prev, value] : prev.filter((item) => item !== value)
        );
    };

    return (
        <div>
            <h2>통증 양상을 선택해 주세요.</h2>
            <div>
                {painOptions.map((option, index) => (
                    <div key={index}>
                        <input
                            type="checkbox"
                            value={option}
                            checked={selectedPainTypes.includes(option)}
                            onChange={handleCheckboxChange}
                        />
                        {option}
                    </div>
                ))}
            </div>
            {selectedPainTypes.length > 0 && (
                <button onClick={onNext}>다음</button>
            )}
        </div>
    );
}
