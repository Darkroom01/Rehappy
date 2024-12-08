import axios from "axios";

export const getNearbyHospitals = async (lat, lng, keyword) => {
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

