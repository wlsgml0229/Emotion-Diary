import { useEffect, useRef, useMemo, useCallback, useReducer } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  //2개의 파라미터 받음 (상태변화일어나기직전의 state, 어떤정보로 상태를변화시킬지)
  //리턴하는 값으로 상태가변화됨
  const reducer = (state, action) => {
    switch (action.type) {
      case "INIT":
        return action.data;
      case "CREATE": {
        const created_date = new Date().getTime();
        const newItem = { ...action.data, created_date };
        // 새로운아이템을 원래의 배열에 붙여서 return
        return [newItem, ...state];
      }
      case "REMOVE": {
        return state.filter((it) => it.id !== action.targetId);
      }
      case "EDIT": {
        return state.map((it) =>
          it.id === action.targetId ? { ...it, content: action.newContent } : it
        );
      }
      default:
        return state;
    }
  };
  // data 를 useReducer로 관리하게 변경 (상태변화함수, 데이터 state의 초기값)
  // const [data, setData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);

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
    dispatch({ type: "INIT", data: initData });
  };

  //app 컴포넌트가 마운트 됐을때 getData호출
  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, content, emotion) => {
    // 아이템 데이터만 담아서 보냄 created_data 뺴고
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    dataId.current += 1;
    //함수형 업데이트 -> 그대로 데이터값을 참고해서 새로운 배열 반환 했을때는 메모이제이션되면서 빈상태로 멈춰있기때문에 아래와같이 기능할수있도록 변경
  }, []);

  const onRemove = useCallback((targetId) => {
    console.log(`${targetId} 가 삭제되었습니다.`);
    // 아래내용을 지우고 setData 에 직접적으로 변경될 data를 받아와서 삭제를 진행시킨다.
    // const newDiaryList = data.filter((it) => it.id !== targetId);
    dispatch({ type: "DELETE", targetId });
  }, []);

  //타겟 아이디와 일치하는 아이디의 내용을 새로운 내용으로 수정 아닌것은 그냥 반환
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
  }, []);

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
