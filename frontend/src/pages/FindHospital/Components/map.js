import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const MapComponent = ({
                          libraries,
                          mapCenter,
                          setMapInstance,
                          handleDragEnd,
                          hospitals,
                          selectedHospital,
                          setSelectedHospital,
                          isEmergency, hospitalData
                      }) => {
    const apiKey = process.env.REACT_APP_GOOGLE_PLACES_API_KEY;

    return (
        <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
            <GoogleMap
                mapContainerStyle={{
                    position: "absolute",
                    right: 0,
                    width: "calc(100% - 300px)",
                    height: "100%",
                }}
                zoom={14}
                center={mapCenter}
                onLoad={(map) => setMapInstance(map)} // Google Map 인스턴스 저장
                onDragEnd={handleDragEnd} // 지도 드래그 이벤트
                onError={(e) => console.error("Error loading map", e)}
            >
                {isEmergency ? (
                    <>
                        {/*{hospitalData.map((hospital, index) => (*/}
                        {/*    <Marker*/}
                        {/*        key={index}*/}
                        {/*        position={{*/}
                        {/*            lat: hospital.lat,*/}
                        {/*            lng: hospital.lng,*/}
                        {/*        }}*/}
                        {/*        title={hospital.name}*/}
                        {/*        onClick={() => setSelectedHospital(hospital)} // 마커 클릭 이벤트*/}
                        {/*    />*/}
                        {/*))}*/}
                    </>
                ) : (
                    <>
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
                    </>
                )}


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
    );
};

export default MapComponent;
