import React, { useState } from 'react';
import { Button, Space} from "antd/lib/index";

type props = {text?: string, icons?: any, type?: any, onclick?: any}

const FullRoundedButton = ({text, icons, type, onclick}:props) => {

  return (
    <Button
    type="primary"
    shape="round"
    style={{backgroundColor: '#FF7D04'}}
    onClick={onclick}
    htmlType={type} 
>
      <Space>

      </Space>
      {text}{icons}

    </Button>
  );
};
export default FullRoundedButton