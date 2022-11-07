import { useEffect, useRef, useState, useMemo } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  // getData 는 api 호출후 데이터 가공하고 setData를 통해서 화면이 렌더링 되었을때 일기 목록을 불러오는 것을 구현
  const getData = async () => {
    const result = await fetch(
      `https://jsonplaceholder.typicode.com/comments`
    ).then((res) => res.json());
    console.log(result);

    // 일기데이터에 맞추기위해서 데이터 변경 (랜덤데이터 0~4까지 + 1) 해준 것
    const initData = result.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  //app 컴포넌트가 마운트 됐을때 getData호출
  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    console.log(newItem);
    dataId.current += 1;
    setData([...data, newItem]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId} 가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  //타겟 아이디와 일치하는 아이디의 내용을 새로운 내용으로 수정 아닌것은 그냥 반환
  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  // 일기 감정점수에 따른 갯수를 구해주는 함수
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    // 객체로 리턴
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  //구조분해할당으로 똑같이 전달받음
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수 : {goodCount}</div>
      <div>기분 나쁜 일기 개수 : {badCount}</div>
      <div>기분 좋은 일기 비율 : {goodRatio}</div>
      <DiaryList
        onEdit={onEdit}
        onRemove={onRemove}
        diaryList={data}
      ></DiaryList>
    </div>
  );
}

export default App;
