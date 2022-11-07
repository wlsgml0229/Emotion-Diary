import React, { useEffect, useState } from "react";

const UnmountTest = () => {
  useEffect(() => {
    console.log("mount");
    return () => {
      // Unmount 시점에 실행
      console.log("Unmount");
    };
  }, []);
  return <div>UnmountTest</div>;
};
// 단락회로 평가에 따라 값이 true or false 에 따라 뒤에 컴포넌트를 보여줄지 말지 결정할수 있음
const Lifecycle = () => {
  const [isVisible, setisVisible] = useState(false);
  const toggle = () => setisVisible(!isVisible);
  return (
    <div style={{ padding: 20 }}>
      <button onClick={toggle}>ON/OFF</button>
      {isVisible && <UnmountTest />}
    </div>
  );
};

export default Lifecycle;
