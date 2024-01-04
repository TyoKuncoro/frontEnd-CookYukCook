import { List, Space } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { Card } from "antd/lib/index";

const ListTrainee = ({ usersData }:any) => {
  const data = usersData.usersPay.map((items:any) => items.users.name)
  console.log(data, "apa isinya")
  console.log(usersData, "ini data")
  return (
    <div className="w-72 border border-solid border-button rounded-md" >
      <List
      size="small"
      // bordered
      header={<div className="text-lg font-medium">List Trainee:</div>}
      dataSource={data}
      renderItem={(item, index) => <List.Item className="text-base text-start">{index+1}.  {item}</List.Item>}
    />
    </div>
    // <Card
    //   title="List Trainee"
    //   bordered={false}
    //   style={{ width: 300, border:'#FFC672 1px solid'}}
    //   headStyle={{ fontSize: 24, borderBottom: 0, paddingBottom:0}}
    // >
    //   <ol className="text-xl text-start p-2 space-y-1">
    //     {usersData.usersPay.map((items: any) => {
    //       return (
    //         <li key={items.id}>{items.users.name}</li>
    //       )
    //     })}
        
    //   </ol>
    // </Card>
  );
};
export default ListTrainee;
