import React, { useState } from 'react';
import { Button, Space } from "antd/lib/index";

type props = {text?: string, icons?: any, onclick?: any}

const LogoutButton = ({text, icons, onclick}:props) => {

  return (
    <Button
      type="primary"
      style={{backgroundColor: '#FF0000'}}
      onClick={onclick}
    >
      <Space>
      {text}{icons}
      </Space>
    </Button>
  );
};
export default LogoutButton
