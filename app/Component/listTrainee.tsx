import { Card } from "antd/lib/index";

const ListTrainee = ({ usersData }:any) => {
  console.log(usersData, "ini data")
  return (
    <Card
      title="List Trainee"
      bordered={false}
      style={{ width: 300, border:'#FFC672 1px solid'}}
      headStyle={{ fontSize: 24, borderBottom: 0, paddingBottom:0}}
    >
      <ol className="text-xl text-start p-2 space-y-1">
        {usersData.usersPay.map((items: any) => {
          return (
            <li key={items.id}>{items.users.name}</li>
          )
        })}
        
      </ol>
    </Card>
  );
};
export default ListTrainee;
