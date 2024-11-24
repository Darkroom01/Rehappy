import styled from "styled-components";

export const ContentsContainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
`
export const PlacesContainer = styled.div`
    height: 100%;
    width: 450px;
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
    background-color: white;
    border-radius: 0 20px 20px 0;
    box-shadow: 5px 0 10px rgba(0, 0, 0, 0.37);
`
export const PlacesWrapper = styled.div`
    position: relative;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
export const LogoWrapper = styled.div`
    width: 200px;
    height: auto;
    margin: 10px auto;
`
export const Logo = styled.img`
    width: 100%;
    height: 100%;
`
export const SearchInput = styled.input`
    width: 280px;
    height: 40px;
    color: gray;
    background-color: lightgray;
    border-radius: 30px;
    border: none;
    padding: 0 20px;
`
export const SearchWrapper = styled.div`
    width: auto;
    height: auto;
    position: relative;
`
export const SearchButton = styled.div`
    position: absolute;
    cursor: pointer;
    width: 20px;
    height: 20px;
    top: 10px;
    right: 10px;
    background-image: url('/images/serachButton.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
`
export const HospitalInfo = styled.div`
    width: 100%;
    height: auto;
    margin-bottom: 50px;
`
export const Hospitals = styled.div`
    width: 100%;
    margin: 50px 0;
    height: calc(100% - 200px);
    overflow-y: auto;
`