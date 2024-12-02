import {
    Comment1,
    Comments,
    ContentsWrapper,
    NewComment,
    NewCommentInput,
    PostButton,
    PostContent,
    PostTitle
} from "./style";
import {Reset} from "styled-reset";
import TopBarComponent from "../../components/TopBarComponent";
import Cookies from "js-cookie";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function PostDetail() {
    const token = Cookies.get('jwt');
    const navigate = useNavigate();
    const [newCommentValue, setNewCommentValue] = useState(""); // 새 댓글 내용
    const [comments, setComments] = useState([]); // 댓글 데이터 저장

    // 게시물 수정 페이지로 이동
    const handleGoToEdit = () => {
        navigate('/edit', {
            state: { category: 'PAIN_TIPS', title: '제목이에용', content: '내용빡' }
        });
    };

    // 게시글 삭제
    const handleDeletePost = () => {
        alert('삭제하깅');
        navigate('/community');
    }

    // 댓글 쓰기 핸들러
    const handleNewCommentInput = (e) => {
        setNewCommentValue(e.target.value);
    }

    // 댓글 제출
    const handleSubmitNewComment = async () => {
        if (token) {
            if (newCommentValue) {
                console.log('newCommentValue:',newCommentValue)

                try {
                    await axios.post('http://localhost:8080/api/comments', null, {
                        params: {
                            // private Long id;
                            // private String content;
                            // private String author;
                            // private String authorName; // 작성자 이름
                            // private Long postId; // 댓글이 속한 게시글 ID
                            // private LocalDateTime createdAt;
                            content: newCommentValue,
                            authorName: '우더니',
                        },
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': '*/*'
                        }
                    });
                } catch (error) {
                    console.error('Failed to upload new comment', error);
                    console.error('Error details:', error.response?.data);
                }
            } else {
                alert("댓글 내용을 작성해 주세요.");
            }
        } else {
            alert("로그아웃 상태입니다.");
        }
    }

    // 댓글 가져오기
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/comments/post/1');
                setComments(response.data); // 댓글 데이터 저장
                console.log('댓글:',response.data)
            } catch (error) {
                console.error('Failed to fetch contents', error);
            }
        };
        fetchComments();
    }, []);

    return (
        <>
            <Reset/>
            <TopBarComponent/>
            <ContentsWrapper style={{width: '940px'}}>
                <ContentsWrapper style={{
                    width: '800px',
                    border: '2px solid #D7E8FF',
                    borderRadius:'2em',
                    padding: '60px 70px 110px 70px',
                    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.18)',
                }}>
                    <PostTitle>
                        어쩌고 저쩌고 이 병원 완전 친절하고 좋았어요~~~~ 강추
                    </PostTitle>
                    <hr style={{border: '2px solid #FFAE00', margin: '20px 0 40px 0'}}/>
                    <PostContent>
                        그냥 어깨가 좀 아파서 평소 가던 병원 말고 집 앞에 새로 생긴 병원으로 가봤는데요~ 병원이 잘생겼고 의사쌤이 깔끔해서 좋았어요 ^^
                        간호사 쌤들도 완전 친절했어요 ㅎㅎ 다들 아플때 한번 가 보세요 개강추!
                    </PostContent>
                </ContentsWrapper>
                <div style={{width: 'max-content', margin: '30px 0 0 auto'}}>
                    <PostButton onClick={handleGoToEdit}>수정하기</PostButton>
                    <PostButton onClick={handleDeletePost}>삭제하기</PostButton>
                </div>
                <p style={{fontSize: '25px', fontWeight: 'bold'}}>댓글</p>

                <Comments>
                    <NewComment>
                        <div style={{width: 'fit-content', fontSize: '17px', marginBottom: '1px'}}>우더니 :</div>
                        <NewCommentInput
                            type="text"
                            value={newCommentValue}
                            onChange={handleNewCommentInput}
                            placeholder='댓글을 작성해주세요.' />
                        <div onClick={handleSubmitNewComment} style={{marginLeft: 'auto', cursor: 'pointer'}}>
                            <svg width="30" height="30" viewBox="0 0 48 48" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 4L33 11L36 26L26 36L11 33L4 4ZM4 4L19.172 19.172M24 38L38 24L44 30L30 44L24 38ZM26 22C26 24.2091 24.2091 26 22 26C19.7909 26 18 24.2091 18 22C18 19.7909 19.7909 18 22 18C24.2091 18 26 19.7909 26 22Z"
                                    stroke="#FFAE00" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </NewComment>

                    {/*댓글 표시*/}
                    {comments ? (<>
                        {comments.map((comment, index) => (
                            <Comment1 key={index}>
                                <span style={{color: '#616161'}}>{comment.authorName} : </span>{comment.content}
                            </Comment1>
                        ))}
                    </>) : (<></>)}
                </Comments>
            </ContentsWrapper>

        </>

    );
}