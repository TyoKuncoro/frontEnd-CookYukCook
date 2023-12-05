import React, { useState } from 'react';
import { Button, Space} from "antd/lib/index";

type props = {text: string, icons: any, type: any}

const FullRoundedButton = ({text, icons, type}:props) => {

  return (
    <Button
    type="primary"
    shape="round"
    style={{backgroundColor: '#FF7D04'}}
    htmlType={type} 
>
      <Space>

      </Space>
      {text}{icons}

    </Button>
  );
};
export default FullRoundedButton