import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const dummyList = [
    {
      id: 1,
      author: "김진희",
      content: "하이",
      emotion: 5,
      created_date: new Date().getTime(), // 이렇게 선언하면 현재시간을 반환, getTime -> 밀리세컨드로 변환
    },
    {
      id: 1,
      author: "김진희",
      content: "하이w",
      emotion: 5,
      created_date: new Date().getTime(),
    },
    {
      id: 1,
      author: "김진희",
      content: "하이e",
      emotion: 3,
      created_date: new Date().getTime(),
    },
    {
      id: 1,
      author: "sisi",
      content: "하이3",
      emotion: 2,
      created_date: new Date().getTime(),
    },
  ];

  return (
    <div className="App">
      <DiaryEditor></DiaryEditor>
      <DiaryList diaryList={dummyList}></DiaryList>
    </div>
  );
}

export default App;
