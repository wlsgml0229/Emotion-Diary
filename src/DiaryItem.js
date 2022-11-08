import React, { useState, useRef, useEffect } from "react";

const DiaryItem = ({
  author,
  content,
  created_date,
  emotion,
  id,
  onRemove,
  onEdit,
}) => {
  useEffect(() => {
    // console.log(`${id}번 아이템 렌더!`);
  });
  // isEdit 은 true, false로 지금 수정중인지 아닌지 판단하게됨
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);
  // textarea input을 핸들링할 데이터 -> useState 기본값으로 받아온 content 를 넣어주면 수정시에 자동으로 들어간다.
  const [localContent, setLocalContent] = useState(content);
  // 댓글에서도 내용 글자수 5넘지 않을경우 포커스 추가
  const localContentInput = useRef();

  // 닫기했을때, 바뀐데이터가 남아있지 않고 원래의 content 내용으로 다시 바꾸도록 localContent 조작 ( 수정 취소 버튼 )
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };
  // 삭제하기 버튼 이벤트
  const handleRemove = () => {
    if (window.confirm(`${id} 번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };
  //수정완료버튼이벤트
  const handleEdit = () => {
    console.log(id, localContent);
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    // 수정하기 전에 propmt창
    if (window.confirm(`${id} 번째 일기를 수정하시겠습니까?`)) {
      //props로 받아온 edit 함수 실행
      onEdit(id, localContent);
      // 수정폼 닫기
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자: {author} | 감정 점수 : {emotion}
        </span>
        <br />
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정하기</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};

export default React.memo(DiaryItem);
