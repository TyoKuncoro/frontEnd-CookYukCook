import React from "react";
import { Button } from "antd/lib/index";

type props = {text?: string, onclick?:any, key?:any}
const UbahMateriBtn = ({text, onclick}:props) => {
    return(
        <Button className="shadow-md" type="primary"onClick={onclick}>{text}</Button>
    )
}
export default UbahMateriBtn;
// .ant-btn.ant-btn-round