import {
    ContentsContainer, HospitalInfo, Hospitals,
    Logo,
    LogoWrapper,
    PlacesContainer,
    PlacesWrapper, SearchButton,
    SearchInput,
    SearchWrapper
} from "./style";
import { Reset } from "styled-reset";
import { useEffect, useState } from "react";
import CategorySelector from "./Components/categorySelector";
import {getNearbyHospitals} from "./functions";
import MapComponent from "./Components/map";
import {useNavigate} from "react-router-dom";

export default function FindHospital() {
    const navigate = useNavigate();
    const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
    const libraries = ['places'];
    const [hospitals, setHospitals] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 37.500967, lng: 126.993653 }); // 초기 중심점
    const [selectedHospital, setSelectedHospital] = useState(null); // 선택된 병원 정보
    const [keyword, setKeyword] = useState("병원"); // 초기값 "병원"
    const [mapInstance, setMapInstance] = useState(null); // Google Map 인스턴스

    const infoTexts = {
        의원: "의원은 기본적인 진료 및 간단한 처치를 제공하는 곳입니다.",
        병원: "병원은 더 정밀한 검사와 치료를 제공하는 곳입니다.",
        종합병원: "종합병원은 다양한 진료과목과 전문의가 있는 대형 병원입니다.",
    };



    // 검색어(keyword)에 따라 데이터 가져오기
    useEffect(() => {
        const fetchHospitals = async () => {
            const data = await getNearbyHospitals(mapCenter.lat, mapCenter.lng, keyword);
            setHospitals(data);
            console.log('병원 데이터:',data)
        };
        fetchHospitals();
    }, [mapCenter, keyword]); // mapCenter와 keyword 변경 시 API 호출

    // 지도 드래그 후 mapCenter 업데이트
    const handleDragEnd = () => {
        if (mapInstance) {
            const newCenter = mapInstance.getCenter();
            setMapCenter({
                lat: newCenter.lat(),
                lng: newCenter.lng(),
            });
        }
    };

    return (
        <>
            <Reset/>
            <ContentsContainer>
                {/* 지도 로드 */}
                <MapComponent
                    apiKey={apiKey}
                    libraries={libraries}
                    mapCenter={mapCenter}
                    setMapInstance={setMapInstance}
                    handleDragEnd={handleDragEnd}
                    hospitals={hospitals}
                    selectedHospital={selectedHospital}
                    setSelectedHospital={setSelectedHospital}
                />
                {/* 좌측 컨테이너 */}
                <PlacesContainer>
                    <PlacesWrapper>
                        <LogoWrapper>
                            <Logo onClick={() => (navigate('/'))} src='/images/logo.png' alt='리해피 로고' />
                        </LogoWrapper>
                        <SearchWrapper>
                            <SearchInput placeholder='검색어를 입력하세요.' />
                            <SearchButton />
                        </SearchWrapper>
                        {/* 라디오 버튼 */}
                        <CategorySelector keyword={keyword} setKeyword={setKeyword} infoTexts={infoTexts} />
                        <Hospitals>
                            {hospitals.map((hospital, index) => (
                                <HospitalInfo key={index}>
                                    <h4>{hospital.name}</h4>
                                    <p>{hospital.vicinity}</p>
                                    <p>평점: {hospital.rating || "정보 없음"}</p>
                                    {hospital?.opening_hours?.open_now !== undefined ? (
                                        <p>open_now: {hospital.opening_hours.open_now ? "Open" : "Closed"}</p>
                                    ) : (
                                        <p>Loading...</p>
                                    )}

                                </HospitalInfo>
                            ))}
                        </Hospitals>
                    </PlacesWrapper>
                </PlacesContainer>
            </ContentsContainer>
        </>
    );
}
