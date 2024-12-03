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
import axios from "axios";

export default function FindHospital() {
    const navigate = useNavigate();
    const API_KEY = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;
    const libraries = ['places'];
    const [hospitals, setHospitals] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 37.500967, lng: 126.993653 }); // 초기 중심점
    const [mapCenterCountry, setMapCenterCountry] = useState('');
    const [selectedHospital, setSelectedHospital] = useState(null); // 선택된 병원 정보
    const [keyword, setKeyword] = useState("병원"); // 초기값 "병원"
    const [mapInstance, setMapInstance] = useState(null); // Google Map 인스턴스
    const [isEmergency, setIsEmergency] = useState(false); // 응급실 현황 검색: true, 일반 병원 검색: false

    const [hospitalData, setHospitalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // 응급실
    const EMERGENCY_API_URL = "http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire";
    const EMERGENCY_API_KEY = "4ksvvmcCPLiK2hbORQmPiA%2FlZRqRpX9uz8WIw9lqRuhSv8eQIJiaRrme5ZD1mJ%2Ft0226Hp6tBfYVWRycck6Big%3D%3D";

    const infoTexts = {
        의원: "의원은 기본적인 진료 및 간단한 처치를 제공하는 곳입니다.",
        병원: "병원은 더 정밀한 검사와 치료를 제공하는 곳입니다.",
        종합병원: "종합병원은 다양한 진료과목과 전문의가 있는 대형 병원입니다.",
    };

    // 맵 센터가 위치한 도시 반환
    useEffect(() => {
        const fetchLocationInfo = async () => {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${mapCenter.lat},${mapCenter.lng}&key=${API_KEY}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                if (data.status === "OK") {
                    const addressComponents = data.results[0].address_components;

                    const stage1 = addressComponents.find(component =>
                        component.types.includes("administrative_area_level_1")
                    )?.long_name;

                    const stage2 = addressComponents.find((component) =>
                            component.types.includes("locality")
                        )?.long_name;

                    console.log(`STAGE1 (시도): ${stage1}`);
                    console.log(`STAGE1 (시군구): ${stage2}`);

                    const result = stage1.endsWith("도") ? stage2 : stage1;
                    setMapCenterCountry(result);
                } else {
                    console.error("Geocoding API 요청 실패:", data.status);
                }
            } catch (error) {
                console.error("Geocoding API 에러:", error);
            }
        };
        fetchLocationInfo();
    }, [mapCenter]);


    // 응급실 가용 병상 수 현황 가져오기
    useEffect(() => {
        const fetchData = async () => {
            const url = `${EMERGENCY_API_URL}?serviceKey=${EMERGENCY_API_KEY}&STAGE1=${mapCenterCountry}&pageNo=1&numOfRows=10`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const xmlText = await response.text(); // XML 데이터를 텍스트로 받아오기
                    const parser = new DOMParser();
                    const xml = parser.parseFromString(xmlText, "application/xml"); // XML 파싱

                    const items = xml.getElementsByTagName("item");
                    const data = Array.from(items).map((item) => ({
                        name: item.getElementsByTagName("dutyName")[0]?.textContent || "정보 없음",
                        beds: item.getElementsByTagName("hvec")[0]?.textContent || "정보 없음",
                        phone: item.getElementsByTagName("dutyTel3")[0]?.textContent || "정보 없음",
                    }));

                    setHospitalData(data);
                } else {
                    setError(`HTTP 에러: ${response.status}`);
                }
            } catch (err) {
                setError("데이터를 가져오는 중 오류 발생");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

    }, [mapCenter]);

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

    const getColor = (beds) => {
        const numBeds = parseInt(beds, 10); // 문자열을 숫자로 변환
        if (numBeds <= 4) return "red";
        if (numBeds <= 9) return "orange";
        return "green";
    };


    return (
        <>
            <Reset/>
            <ContentsContainer>
                {/* 지도 로드 */}
                <MapComponent
                    libraries={libraries}
                    mapCenter={mapCenter}
                    setMapInstance={setMapInstance}
                    handleDragEnd={handleDragEnd}
                    hospitals={hospitals}
                    selectedHospital={selectedHospital}
                    setSelectedHospital={setSelectedHospital}
                    isEmergency={isEmergency}
                    hospitalData={hospitalData}
                />
                {/* 좌측 컨테이너 */}
                <PlacesContainer>
                    <PlacesWrapper>
                        <LogoWrapper>
                            <Logo onClick={() => navigate('/')} src='/images/logo.png' alt='리해피 로고' />
                        </LogoWrapper>
                        <button onClick={() => setIsEmergency(!isEmergency)}>응급실 함보까</button>
                        {isEmergency ? (
                            // 응급 상황 병원 검색 모드
                            <>
                                {hospitalData.map((hospital, index) => (
                                    <div style={{width: '80%', marginBottom: '20px', fontSize: '18px', lineHeight: '1.2'}} key={index}>
                                        <div style={{fontWeight: 'bold'}}>{hospital.name}</div>
                                        <div>
                                            가용 병상 수:{" "}
                                            <span style={{color: getColor(hospital.beds)}}>{hospital.beds}</span>
                                        </div>
                                        <div>응급실 전화번호: {hospital.phone}</div>
                                    </div>
                                ))}
                            </>
                        ) : (
                            // 일반 병원 검색 모드
                            <>
                                <SearchWrapper>
                                    <SearchInput placeholder='검색어를 입력하세요.'/>
                                    <SearchButton/>
                                </SearchWrapper>
                                {/* 라디오 버튼 */}
                                <CategorySelector keyword={keyword} setKeyword={setKeyword} infoTexts={infoTexts} />
                                <Hospitals>
                                    {hospitals.map((hospital, index) => (
                                        <HospitalInfo onClick={() => setSelectedHospital(hospital)} key={index}>
                                            <p style={{fontWeight: 'bold'}}>{hospital.name}</p>
                                            <p>{hospital.vicinity}</p>
                                            <p>평점: {hospital.rating || "정보 없음"}</p>
                                            {hospital?.opening_hours?.open_now !== undefined ? (
                                                <p>{hospital.opening_hours.open_now ? "영업중" : "영업종료"}</p>
                                            ) : (
                                                <p>영업시간 정보 없음</p>
                                            )}

                                        </HospitalInfo>
                                    ))}
                                </Hospitals>
                            </>
                        )}
                    </PlacesWrapper>
                </PlacesContainer>
            </ContentsContainer>
        </>
    );
}
