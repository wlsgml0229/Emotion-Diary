import { useRef, useState } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  // const dummyList = [
  //   {
  //     id: 1,
  //     author: "김진희",
  //     content: "하이",
  //     emotion: 5,
  //     created_date: new Date().getTime(), // 이렇게 선언하면 현재시간을 반환, getTime -> 밀리세컨드로 변환
  //   },
  //   {
  //     id: 2,
  //     author: "김진희",
  //     content: "하이w",
  //     emotion: 5,
  //     created_date: new Date().getTime(),
  //   },
  //   {
  //     id: 3,
  //     author: "김진희",
  //     content: "하이e",
  //     emotion: 3,
  //     created_date: new Date().getTime(),
  //   },
  //   {
  //     id: 4,
  //     author: "sisi",
  //     content: "하이3",
  //     emotion: 2,
  //     created_date: new Date().getTime(),
  //   },
  // ];
  // console.log(dummyList);
  const [data, setData] = useState([]);

  const dataId = useRef(0);
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([...data, newItem]);
  };
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data}></DiaryList>
    </div>
  );
}

export default App;
