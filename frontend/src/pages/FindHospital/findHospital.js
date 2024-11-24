import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
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
import axios from "axios";
import CategorySelector from "./Components/categorySelector";

export default function FindHospital() {
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

    const getNearbyHospitals = async (lat, lng, keyword) => {
        try {
            const response = await axios.get("http://localhost:8080/api/nearby-hospitals", {
                params: {
                    lat,
                    lng,
                    keyword,
                    language: "ko"
                },
            });
            return response.data.results || [];
        } catch (error) {
            console.error("Error fetching hospitals:", error);
            return [];
        }
    };

    // 검색어(keyword)에 따라 데이터 가져오기
    useEffect(() => {
        const fetchHospitals = async () => {
            const data = await getNearbyHospitals(mapCenter.lat, mapCenter.lng, keyword);
            setHospitals(data);
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
                <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
                    <GoogleMap
                        mapContainerStyle={{ position: "absolute", right: 0, width: 'calc(100% - 300px)', height: '100%' }}
                        zoom={14}
                        center={mapCenter}
                        onLoad={(map) => setMapInstance(map)} // Google Map 인스턴스 저장
                        onDragEnd={handleDragEnd} // 지도 드래그 이벤트
                        onError={(e) => console.error('Error loading map', e)}
                    >
                        {hospitals.map((hospital, index) => (
                            <Marker
                                key={index}
                                position={{
                                    lat: hospital.geometry.location.lat,
                                    lng: hospital.geometry.location.lng,
                                }}
                                title={hospital.name}
                                onClick={() => setSelectedHospital(hospital)} // 마커 클릭 이벤트
                            />
                        ))}

                        {/* InfoWindow */}
                        {selectedHospital && (
                            <InfoWindow
                                position={{
                                    lat: selectedHospital.geometry.location.lat,
                                    lng: selectedHospital.geometry.location.lng,
                                }}
                                onCloseClick={() => setSelectedHospital(null)} // 닫기 버튼 이벤트
                            >
                                <div>
                                    <h4>{selectedHospital.name}</h4>
                                    <p>{selectedHospital.vicinity}</p>
                                    <p>평점: {selectedHospital.rating || "정보 없음"}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </LoadScript>
                {/* 좌측 컨테이너 */}
                <PlacesContainer>
                    <PlacesWrapper>
                        <LogoWrapper>
                            <Logo src='/images/logo.png' alt='리해피 로고' />
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
                                </HospitalInfo>
                            ))}
                        </Hospitals>
                    </PlacesWrapper>
                </PlacesContainer>
            </ContentsContainer>
        </>
    );
}
