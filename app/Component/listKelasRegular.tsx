import React, { useState } from "react";
import { Collapse, Space, Tag } from "antd";
import UbahMateri from "./material/modalUbahMateri";
import { LinkOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import ColumnGroup from "antd/es/table/ColumnGroup";
import Column from "antd/es/table/Column";
import TambahMateri from "./material/modal";

const {Panel} = Collapse;
const ListKelasRegular = ( {classData,mutate, onClose}: any ) => {
    console.log(classData, "ini data materi")
    const [active, setActive] = useState<string>('')
    return (
        <div>
            <Collapse
            accordion
                size="small"
                className="w-[600px] bg-white m-auto text-lg border-list text-start shadow-sm"
                collapsible="icon"
                // activeKey={active} ghost={true}
            >
                {classData.material?.map((material:any) => (
            <Panel header={material.name} key={material.id} extra={<UbahMateri onClose={onClose} setOpenModal={false} idMateri={material.id} mutate={mutate}/>}>
                    <div>
                        <a href={material.link} target="_blank"> <LinkOutlined/> {material.link}</a>
                    </div>
            </Panel>
                ))}
            </Collapse>
            {/* <Collapse
                  items={items}
                /> */}

        </div>
    )
}
export default ListKelasRegular