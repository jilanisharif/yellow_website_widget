import React from "react";
import RightContainer from "./RightContainer";
import LeftContainer from "./LeftContainer";

import { Col, Row } from "antd";
const Body = () => {
  return (
    <div className='main-container'>
      <div className='body-container'>
        <Row>
          <Col span={12} className='left-container'>
            <LeftContainer />
          </Col>

          <Col span={12} className='right-container'>
            <RightContainer />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Body;
