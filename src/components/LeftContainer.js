import React from "react";

import { Typography } from "antd";
const { Text } = Typography;

const LeftContainer = () => {
  return (
    <div className='left-header'>
      <Text className='left-header-text'>
        Wanna see how our chatbot looks on your{" "}
        <span style={{ color: "#f27264" }}>Website?</span>
      </Text>
      <img
        // https://cdn.yellowmessenger.com/Ebv8uJGwWgQU1665486797890.png
        src='https://cdn.yellowmessenger.com/NO57bMAre1IV1660143450711.svg'
        alt='widget'
      />
    </div>
  );
};

export default LeftContainer;
