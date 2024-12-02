import {ContentsWrapper, PostContent, PostTitle} from "./style";
import {Reset} from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent";

export default function PostDetail() {
    return (
        <>
            <Reset/>
            <TopBarComponent/>
            <ContentsWrapper>
                <PostTitle></PostTitle>
                <PostContent></PostContent>
            </ContentsWrapper>
        </>

    );
}