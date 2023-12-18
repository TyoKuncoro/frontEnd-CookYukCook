import React, { useState } from 'react';
import { Button, Space } from "antd/lib/index";

type props = {text: string, icons: any}

const Button1 = ({text, icons}:props) => {

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
export default Button1