import React from "react";
import { Collapse } from "antd";
import UbahMateri from "./material/modalUbahMateri";
import { LinkOutlined } from "@ant-design/icons";

const {Panel} = Collapse;
const ListKelasRegular = ({ classData }) => {
    return (
        <Collapse
            size="small"
            className="w-[1000px] bg-white m-auto text-lg border-list"
        >
            {classData.material.map((material:any) => (
        <Panel header={material.name} key={material.id} extra={<UbahMateri/>}>
                <div>
                    <a href={material.link} target="_blank"> <LinkOutlined/> {material.link}</a>
                </div>
        </Panel>
            ))}
        </Collapse>
        // <Collapse
        //       items={items}
        //     />
    )
}
export default ListKelasRegular