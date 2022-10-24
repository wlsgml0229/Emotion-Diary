import { useState } from "react";

const DiaryEditor = () => {
  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });
  // useState 사용하여 상태변수 생성
  // 각각쓰는 방법말고 위와같이 정리하여 쓸수 있다.
  //   const [author, setAuthor] = useState("");
  //   const [content, setContent] = useState("");

  // 이벤트핸들러도 합쳐서 사용하기
  // input 에 지정한 name 값과 value값으로 값을 변경시킴
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    console.log(state);
    alert("저장 성공");
  };
  return (
    <div className="DiaryEditor">
      <h2>오늘의일기</h2>
      <div>
        <input
          name="author"
          value={state.author}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장하기</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
