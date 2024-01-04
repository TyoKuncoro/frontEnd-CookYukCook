import React, { useState } from 'react';
import { Button, Space} from "antd/lib/index";

type props = {text?: string, icons?: any, type?: any, onclick?: any}

const FullRoundedButton = ({text, icons, type, onclick}:props) => {

  return (
    <Button
    type="primary"
    shape="round"
    // style={{backgroundColor: '#FF7D04'}}
    className='text-white bg-button hover:text-button hover:bg-white'
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