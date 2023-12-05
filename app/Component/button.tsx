import React, { useState } from 'react';
import { Button, Space } from "antd/lib/index";

type props = {text: string, icons: null}

const button = ({text, icons}:props) => {

  return (
    <Button
      type="primary"
      style={{backgroundColor: '#FF7D04'}}
    >
      <Space>
      {text}{icons}
      </Space>
    </Button>
  );
};
export default button